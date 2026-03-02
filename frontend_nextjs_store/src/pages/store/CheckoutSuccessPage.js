import React from "react";
import { Link, useSearchParams } from "react-router-dom";

// PUBLIC_INTERFACE
export function CheckoutSuccessPage() {
  /** Checkout confirmation page (frontend-only). */
  const [params] = useSearchParams();
  const orderId = params.get("orderId") || "SM-DEMO";

  return (
    <div className="container page">
      <div className="panel">
        <div className="panelTitle">Order confirmed</div>
        <p className="lead">
          Thank you. Your demo order <strong>{orderId}</strong> has been created.
        </p>
        <div className="row gap">
          <Link to="/catalog" className="btn btnPrimary">
            Continue shopping
          </Link>
          <Link to="/admin" className="btn btnGhost">
            Open admin dashboard
          </Link>
        </div>
        <div className="hint">This is a frontend-only flow. Order details are stored in localStorage.</div>
      </div>
    </div>
  );
}
