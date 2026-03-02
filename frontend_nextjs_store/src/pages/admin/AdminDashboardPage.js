import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export function AdminDashboardPage() {
  /** Admin landing page for CMS functions (frontend-only). */
  return (
    <div className="container page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Admin Dashboard</h1>
          <p className="muted">Manage products and media. Stored locally unless backend is configured.</p>
        </div>
        <div className="badge">CMS</div>
      </div>

      <div className="grid cats">
        <Link to="/admin/products" className="card catCard">
          <div className="catTitle">Products</div>
          <div className="catDesc">Create, edit, and delete products.</div>
        </Link>
        <Link to="/admin/media" className="card catCard">
          <div className="catTitle">Media</div>
          <div className="catDesc">Manage image URLs used across the store.</div>
        </Link>
      </div>

      <div className="panel prose" style={{ marginTop: 18 }}>
        <h3>Backend optional</h3>
        <p>
          If <code>REACT_APP_API_BASE</code> or <code>REACT_APP_BACKEND_URL</code> is set and supports the expected
          endpoints, the app will attempt to hydrate the catalog from the server.
        </p>
      </div>
    </div>
  );
}
