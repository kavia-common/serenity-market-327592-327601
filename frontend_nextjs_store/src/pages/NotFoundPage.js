import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export function NotFoundPage() {
  /** 404 page for unknown routes. */
  return (
    <div className="container page">
      <div className="panel">
        <div className="panelTitle">Page not found</div>
        <p className="muted">The page you’re looking for doesn’t exist.</p>
        <div className="row gap">
          <Link to="/" className="btn btnPrimary">
            Go home
          </Link>
          <Link to="/catalog" className="btn btnGhost">
            Browse catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
