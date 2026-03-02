import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../app/AppProvider";
import { cartTotals } from "../../domain/cart";

// PUBLIC_INTERFACE
export function CartPage() {
  /** Cart page with quantity editing, remove, and checkout entry. */
  const { cart, actions } = useContext(AppContext);
  const totals = cartTotals(cart);
  const nav = useNavigate();

  const items = cart.items || [];

  return (
    <div className="container page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Cart</h1>
          <p className="muted">Review your items and proceed to checkout.</p>
        </div>
        <button className="btn btnGhost" onClick={() => actions.cart.clear()} disabled={!items.length}>
          Clear cart
        </button>
      </div>

      {!items.length ? (
        <div className="panel">
          <div className="panelTitle">Your cart is empty</div>
          <p className="muted">Browse the catalog to add crystals, incense, tarot, and more.</p>
          <Link to="/catalog" className="btn btnPrimary">
            Go to catalog
          </Link>
        </div>
      ) : (
        <div className="layout2">
          <section className="panel">
            <div className="panelTitle">Items</div>
            <div className="cartList">
              {items.map((it) => (
                <div key={it.productId} className="cartItem">
                  <div className="cartImg">{it.imageUrl ? <img alt={it.name} src={it.imageUrl} /> : null}</div>
                  <div className="cartInfo">
                    <div className="cartTitle">{it.name}</div>
                    <div className="muted">${Number(it.price).toFixed(2)}</div>
                    <div className="row gap" style={{ marginTop: 10 }}>
                      <label className="field" style={{ width: 110, margin: 0 }}>
                        <span className="label">Qty</span>
                        <input
                          value={it.qty}
                          onChange={(e) => actions.cart.setQty(it.productId, e.target.value)}
                          inputMode="numeric"
                        />
                      </label>
                      <button className="btn btnGhost" onClick={() => actions.cart.remove(it.productId)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cartLineTotal">${(Number(it.price) * it.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </section>

          <aside className="panel">
            <div className="panelTitle">Summary</div>
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
            <button className="btn btnPrimary btnLg" onClick={() => nav("/checkout")}>
              Checkout
            </button>
            <div className="hint">Checkout is frontend-only (demo). Cart persists in localStorage.</div>
          </aside>
        </div>
      )}
    </div>
  );
}
