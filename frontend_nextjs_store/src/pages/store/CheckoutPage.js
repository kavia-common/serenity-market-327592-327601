import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../app/AppProvider";
import { cartTotals } from "../../domain/cart";
import { saveJson } from "../../lib/storage";

// PUBLIC_INTERFACE
export function CheckoutPage() {
  /** Frontend-only checkout flow with order confirmation and persistence. */
  const { cart, actions } = useContext(AppContext);
  const totals = useMemo(() => cartTotals(cart), [cart]);
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    country: "US"
  });

  const [submitted, setSubmitted] = useState(false);
  const items = cart.items || [];

  if (!items.length && !submitted) {
    return (
      <div className="container page">
        <div className="panel">
          <div className="panelTitle">Your cart is empty</div>
          <p className="muted">Add items before checking out.</p>
          <Link to="/catalog" className="btn btnPrimary">
            Shop catalog
          </Link>
        </div>
      </div>
    );
  }

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function placeOrder(e) {
    e.preventDefault();
    const orderId = `SM-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items,
      totals,
      customer: form
    };

    // Explicit side effect: persist last order for demo purposes.
    saveJson("checkout:lastOrder:v1", order);

    actions.cart.clear();
    setSubmitted(true);
    setTimeout(() => nav(`/checkout/success?orderId=${encodeURIComponent(orderId)}`), 50);
  }

  return (
    <div className="container page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Checkout</h1>
          <p className="muted">A simple frontend-only checkout demo.</p>
        </div>
        <Link to="/cart" className="btn btnGhost">
          Back to cart
        </Link>
      </div>

      <div className="layout2">
        <form className="panel" onSubmit={placeOrder}>
          <div className="panelTitle">Contact & shipping</div>

          <label className="field">
            <span className="label">Email</span>
            <input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" required />
          </label>

          <div className="row gap">
            <label className="field" style={{ flex: 1 }}>
              <span className="label">Full name</span>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </label>
            <label className="field" style={{ width: 160 }}>
              <span className="label">Country</span>
              <select value={form.country} onChange={(e) => update("country", e.target.value)}>
                <option value="US">US</option>
                <option value="CA">Canada</option>
                <option value="GB">UK</option>
                <option value="DE">Germany</option>
              </select>
            </label>
          </div>

          <label className="field">
            <span className="label">Address</span>
            <input value={form.address} onChange={(e) => update("address", e.target.value)} required />
          </label>

          <label className="field">
            <span className="label">City</span>
            <input value={form.city} onChange={(e) => update("city", e.target.value)} required />
          </label>

          <button className="btn btnPrimary btnLg" type="submit">
            Place order (${totals.total.toFixed(2)})
          </button>

          <div className="hint">No payment captured. This is a UI + persistence flow only.</div>
        </form>

        <aside className="panel">
          <div className="panelTitle">Order summary</div>
          {items.map((it) => (
            <div key={it.productId} className="summaryRow">
              <span className="muted">
                {it.name} × {it.qty}
              </span>
              <span>${(Number(it.price) * it.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="divider" />
          <div className="summaryRow">
            <span className="muted">Subtotal</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="summaryRow">
            <span className="muted">Shipping</span>
            <span>{totals.shipping ? `$${totals.shipping.toFixed(2)}` : "Free"}</span>
          </div>
          <div className="summaryRow">
            <span className="muted">Estimated tax</span>
            <span>${totals.tax.toFixed(2)}</span>
          </div>
          <div className="summaryRow total">
            <span>Total</span>
            <span>${totals.total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
