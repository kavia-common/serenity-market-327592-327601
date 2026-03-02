import React from "react";

// PUBLIC_INTERFACE
export function FaqPage() {
  /** Simple FAQ content page. */
  return (
    <div className="container page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">FAQ</h1>
          <p className="muted">Quick answers for the demo storefront.</p>
        </div>
      </div>

      <div className="panel prose">
        <h3>Is checkout real?</h3>
        <p>No. Checkout is a frontend-only flow meant for UI demonstration.</p>

        <h3>Does the cart persist?</h3>
        <p>Yes. Cart state is stored in localStorage as a fallback (works without any backend).</p>

        <h3>Can I manage products?</h3>
        <p>Yes. Use the Admin dashboard to add/edit products and manage media URLs (saved locally).</p>
      </div>
    </div>
  );
}
