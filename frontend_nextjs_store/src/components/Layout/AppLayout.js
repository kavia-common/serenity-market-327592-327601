import React, { useContext } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../../app/AppProvider";
import { cartTotals } from "../../domain/cart";

// PUBLIC_INTERFACE
export function AppLayout() {
  /** Shared app layout (header/nav/footer) for both storefront and admin sections. */
  const { cart } = useContext(AppContext);
  const totals = cartTotals(cart);
  const location = useLocation();
  const inAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="appShell">
      <header className="topbar">
        <div className="container topbarInner">
          <Link to="/" className="brand" aria-label="Serenity Market home">
            <span className="brandMark" aria-hidden="true">
              SM
            </span>
            <div className="brandText">
              <div className="brandName">Serenity Market</div>
              <div className="brandTag">Ocean Professional • Calm, curated, spiritual essentials</div>
            </div>
          </Link>

          <nav className="nav" aria-label="Primary">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
              Store
            </NavLink>
            <NavLink to="/catalog" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
              Catalog
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
              About
            </NavLink>
            <NavLink to="/faq" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
              FAQ
            </NavLink>
          </nav>

          <div className="topbarActions">
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "btn btnGhost active" : "btn btnGhost")}
              aria-label={`Cart with ${totals.itemCount} items`}
            >
              Cart
              <span className="pill">{totals.itemCount}</span>
            </NavLink>
            <NavLink
              to={inAdmin ? "/" : "/admin"}
              className="btn btnPrimary"
              aria-label={inAdmin ? "Exit admin" : "Open admin dashboard"}
            >
              {inAdmin ? "Exit Admin" : "Admin"}
            </NavLink>
          </div>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div>
            <div className="footerTitle">Serenity Market</div>
            <div className="footerMeta">Frontend-only demo with optional API integration.</div>
          </div>
          <div className="footerLinks">
            <Link to="/policies" className="footerLink">
              Policies
            </Link>
            <a className="footerLink" href="https://react.dev" target="_blank" rel="noreferrer">
              Built with React
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
