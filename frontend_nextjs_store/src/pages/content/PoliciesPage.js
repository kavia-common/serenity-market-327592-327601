import React from "react";

// PUBLIC_INTERFACE
export function PoliciesPage() {
  /** Simple policies content page. */
  return (
    <div className="container page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Policies</h1>
          <p className="muted">Demo policy content for completeness.</p>
        </div>
      </div>

      <div className="panel prose">
        <h3>Shipping</h3>
        <p>Demo shipping rules: free over $75, otherwise a flat rate.</p>

        <h3>Returns</h3>
        <p>This is a demo storefront; no real orders are fulfilled.</p>

        <h3>Privacy</h3>
        <p>Checkout form data is stored locally only for demo purposes.</p>
      </div>
    </div>
  );
}
