import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../app/AppProvider";

// PUBLIC_INTERFACE
export function HomePage() {
  /** Storefront landing page with hero and featured products. */
  const { products } = useContext(AppContext);
  const featured = useMemo(() => products.filter((p) => p.featured).slice(0, 4), [products]);

  return (
    <div className="container page">
      <section className="hero">
        <div className="heroCard">
          <div className="heroBadge">Ocean Professional</div>
          <h1 className="h1">Spiritual essentials, curated with calm.</h1>
          <p className="lead">
            Browse crystals, jewelry, incense, and tarot—designed for mindful routines and modern rituals.
          </p>
          <div className="row gap">
            <Link to="/catalog" className="btn btnPrimary btnLg">
              Shop Catalog
            </Link>
            <Link to="/about" className="btn btnGhost btnLg">
              Our Story
            </Link>
          </div>
          <div className="heroMeta">
            Free shipping over $75 • Secure checkout (demo) • Admin CMS included
          </div>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="heroGradient" />
          <div className="heroImageCard">
            <div className="heroImageTitle">Featured picks</div>
            <div className="heroImageSub">Soft gradients • Rounded corners • Clean typography</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">Featured products</h2>
          <Link to="/catalog" className="link">
            View all →
          </Link>
        </div>

        <div className="grid cards">
          {featured.map((p) => (
            <Link to={`/product/${p.id}`} key={p.id} className="card productCard">
              <div className="cardMedia">
                <img src={p.imageUrls?.[0]} alt={p.name} loading="lazy" />
              </div>
              <div className="cardBody">
                <div className="cardTitleRow">
                  <div className="cardTitle">{p.name}</div>
                  <div className="price">${Number(p.price).toFixed(2)}</div>
                </div>
                <div className="cardMeta">{p.category}</div>
                <div className="cardDesc">{p.shortDescription}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">Shop by category</h2>
        </div>
        <div className="grid cats">
          {[
            { label: "Crystals", desc: "Energy, clarity, comfort", to: "/catalog?category=Crystals" },
            { label: "Jewelry", desc: "Wearable intentions", to: "/catalog?category=Jewelry" },
            { label: "Incense", desc: "Aromas for ritual", to: "/catalog?category=Incense" },
            { label: "Tarot", desc: "Guidance & reflection", to: "/catalog?category=Tarot" }
          ].map((c) => (
            <Link to={c.to} key={c.label} className="card catCard">
              <div className="catTitle">{c.label}</div>
              <div className="catDesc">{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
