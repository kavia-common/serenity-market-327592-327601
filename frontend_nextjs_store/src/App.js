import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./app/AppProvider";
import { AppLayout } from "./components/Layout/AppLayout";

import { HomePage } from "./pages/store/HomePage";
import { CatalogPage } from "./pages/store/CatalogPage";
import { ProductDetailPage } from "./pages/store/ProductDetailPage";
import { CartPage } from "./pages/store/CartPage";
import { CheckoutPage } from "./pages/store/CheckoutPage";
import { CheckoutSuccessPage } from "./pages/store/CheckoutSuccessPage";

import { AboutPage } from "./pages/content/AboutPage";
import { FaqPage } from "./pages/content/FaqPage";
import { PoliciesPage } from "./pages/content/PoliciesPage";

import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminProductsPage } from "./pages/admin/AdminProductsPage";
import { AdminProductEditorPage } from "./pages/admin/AdminProductEditorPage";
import { AdminMediaPage } from "./pages/admin/AdminMediaPage";

import { NotFoundPage } from "./pages/NotFoundPage";

// PUBLIC_INTERFACE
function App() {
  /** Serenity Market application entry (routing + providers). */
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/policies" element={<PoliciesPage />} />

            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/products/:id" element={<AdminProductEditorPage />} />
            <Route path="/admin/media" element={<AdminMediaPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
