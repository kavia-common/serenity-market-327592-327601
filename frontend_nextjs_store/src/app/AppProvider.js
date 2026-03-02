import React, { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { getAppConfig } from "./config";
import { createApiClient } from "../lib/apiClient";
import { log, setLogLevel } from "../lib/logger";
import { getDemoProducts } from "../domain/products";
import { cartReducer, loadCart, persistCart } from "../domain/cart";
import { loadJson, saveJson } from "../lib/storage";

const CATALOG_STORAGE_KEY = "catalog:products:v1";
const ADMIN_MEDIA_STORAGE_KEY = "admin:media:v1";

export const AppContext = createContext(null);

/**
 * Flow name: SerenityAppBootstrapFlow
 * Single entrypoint: <AppProvider />
 *
 * Responsibilities:
 * - Normalize config once
 * - Initialize API client
 * - Load catalog (backend if available; else local seed/persisted)
 * - Load/persist cart
 * - Provide reusable actions to UI
 */

// PUBLIC_INTERFACE
export function AppProvider({ children }) {
  /** Provides app-wide state and flows (catalog, cart, admin media). */
  const config = useMemo(() => getAppConfig(), []);
  const api = useMemo(() => createApiClient({ apiBaseUrl: config.apiBaseUrl, backendUrl: config.backendUrl }), [config]);

  const [products, setProducts] = useState(() => {
    const persisted = loadJson(CATALOG_STORAGE_KEY, null);
    if (persisted && Array.isArray(persisted) && persisted.length) return persisted;
    return getDemoProducts();
  });

  const [cart, dispatch] = useReducer(cartReducer, undefined, () => loadCart());

  const [adminMedia, setAdminMedia] = useState(() => loadJson(ADMIN_MEDIA_STORAGE_KEY, []));

  useEffect(() => {
    setLogLevel(config.logLevel);
    log("info", "SerenityAppBootstrapFlow:start", { apiMode: api.mode });
  }, [api.mode, config.logLevel]);

  useEffect(() => {
    // Persist cart on any change.
    persistCart(cart);
  }, [cart]);

  useEffect(() => {
    saveJson(CATALOG_STORAGE_KEY, products);
  }, [products]);

  useEffect(() => {
    saveJson(ADMIN_MEDIA_STORAGE_KEY, adminMedia);
  }, [adminMedia]);

  useEffect(() => {
    // Optional backend hydration; app remains functional if it fails.
    let cancelled = false;
    async function run() {
      if (api.mode !== "http") return;
      try {
        log("info", "CatalogHydrationFlow:start", {});
        const serverProducts = await api.getProducts();
        if (!cancelled && Array.isArray(serverProducts) && serverProducts.length) {
          setProducts(serverProducts);
          log("info", "CatalogHydrationFlow:success", { count: serverProducts.length });
        } else {
          log("warn", "CatalogHydrationFlow:empty", {});
        }
      } catch (err) {
        log("warn", "CatalogHydrationFlow:failed_fallback_to_local", { err: String(err?.message || err) });
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [api]);

  const actions = useMemo(() => {
    return {
      cart: {
        add(item) {
          dispatch({ type: "cart/add", payload: item });
        },
        setQty(productId, qty) {
          dispatch({ type: "cart/setQty", payload: { productId, qty } });
        },
        remove(productId) {
          dispatch({ type: "cart/remove", payload: { productId } });
        },
        clear() {
          dispatch({ type: "cart/clear" });
        }
      },
      catalog: {
        upsertProduct(product) {
          setProducts((prev) => {
            const p = { ...product };
            const idx = prev.findIndex((x) => x.id === p.id);
            if (idx >= 0) return prev.map((x) => (x.id === p.id ? p : x));
            return [p, ...prev];
          });
        },
        deleteProduct(id) {
          setProducts((prev) => prev.filter((p) => p.id !== id));
        }
      },
      adminMedia: {
        add(url) {
          const u = String(url || "").trim();
          if (!u) return;
          setAdminMedia((prev) => (prev.includes(u) ? prev : [u, ...prev]));
        },
        remove(url) {
          setAdminMedia((prev) => prev.filter((x) => x !== url));
        },
        clear() {
          setAdminMedia([]);
        }
      }
    };
  }, []);

  const value = useMemo(() => ({ config, api, products, setProducts, cart, adminMedia, actions }), [
    config,
    api,
    products,
    cart,
    adminMedia,
    actions
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
