import { loadJson, saveJson } from "../lib/storage";

const CART_STORAGE_KEY = "cart:v1";

/**
 * Cart model:
 * - items: Array<{ productId: string, name: string, price: number, imageUrl?: string, qty: number }>
 *
 * Invariants:
 * - qty is integer >= 1
 * - productId is unique per line item
 */

// PUBLIC_INTERFACE
export function loadCart() {
  /** Loads persisted cart from storage; returns { items: [] } if missing/invalid. */
  const cart = loadJson(CART_STORAGE_KEY, { items: [] });
  if (!cart || !Array.isArray(cart.items)) return { items: [] };
  const items = cart.items
    .filter((it) => it && typeof it.productId === "string")
    .map((it) => ({
      productId: it.productId,
      name: String(it.name || ""),
      price: Number(it.price || 0),
      imageUrl: it.imageUrl ? String(it.imageUrl) : "",
      qty: Math.max(1, Math.floor(Number(it.qty || 1)))
    }));
  return { items };
}

// PUBLIC_INTERFACE
export function persistCart(cart) {
  /** Persists cart to storage. Returns boolean success. */
  return saveJson(CART_STORAGE_KEY, cart);
}

// PUBLIC_INTERFACE
export function cartReducer(state, action) {
  /**
   * Reducer contract:
   * - Inputs: state {items: [...]}, action {type, payload}
   * - Output: next state (new object)
   */
  const s = state || { items: [] };
  switch (action.type) {
    case "cart/add": {
      const p = action.payload;
      if (!p || !p.productId) return s;
      const qtyToAdd = Math.max(1, Math.floor(Number(p.qty || 1)));
      const existing = s.items.find((it) => it.productId === p.productId);
      if (existing) {
        return {
          ...s,
          items: s.items.map((it) =>
            it.productId === p.productId ? { ...it, qty: Math.max(1, it.qty + qtyToAdd) } : it
          )
        };
      }
      return {
        ...s,
        items: [
          ...s.items,
          {
            productId: String(p.productId),
            name: String(p.name || ""),
            price: Number(p.price || 0),
            imageUrl: p.imageUrl ? String(p.imageUrl) : "",
            qty: qtyToAdd
          }
        ]
      };
    }
    case "cart/setQty": {
      const { productId, qty } = action.payload || {};
      const nextQty = Math.max(1, Math.floor(Number(qty || 1)));
      return { ...s, items: s.items.map((it) => (it.productId === productId ? { ...it, qty: nextQty } : it)) };
    }
    case "cart/remove": {
      const { productId } = action.payload || {};
      return { ...s, items: s.items.filter((it) => it.productId !== productId) };
    }
    case "cart/clear": {
      return { items: [] };
    }
    default:
      return s;
  }
}

// PUBLIC_INTERFACE
export function cartTotals(cart) {
  /** Computes totals for UI display. */
  const items = (cart && Array.isArray(cart.items) ? cart.items : []).map((it) => ({ ...it, price: Number(it.price) }));
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = subtotal > 75 ? 0 : items.length ? 6.5 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total, itemCount: items.reduce((c, it) => c + it.qty, 0) };
}
