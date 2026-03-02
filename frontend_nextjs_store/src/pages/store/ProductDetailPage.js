import React, { useContext, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../app/AppProvider";

// PUBLIC_INTERFACE
export function ProductDetailPage() {
  /** Product detail page with add-to-cart. */
  const { id } = useParams();
  const { products, actions } = useContext(AppContext);
  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container page">
        <div className="panel">
          <div className="panelTitle">Product not found</div>
          <p className="muted">This product may have been removed. Return to the catalog.</p>
          <Link to="/catalog" className="btn btnPrimary">
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  const img = product.imageUrls?.[0];

  function onAdd() {
    actions.cart.add({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: img,
      qty
    });
  }

  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link to="/catalog" className="link">
          Catalog
        </Link>
        <span className="sep">/</span>
        <span className="muted">{product.name}</span>
      </div>

      <div className="productLayout">
        <div className="productMedia card">
          <img src={img} alt={product.name} />
        </div>

        <div className="productInfo">
          <div className="badge">{product.category}</div>
          <h1 className="h1" style={{ marginTop: 10 }}>
            {product.name}
          </h1>
          <div className="priceLg">${Number(product.price).toFixed(2)}</div>
          <p className="lead">{product.shortDescription}</p>

          <div className="panel">
            <div className="row gap" style={{ alignItems: "end" }}>
              <label className="field" style={{ width: 120 }}>
                <span className="label">Qty</span>
                <input
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Math.floor(Number(e.target.value || 1))))}
                  inputMode="numeric"
                />
              </label>
              <button className="btn btnPrimary btnLg" onClick={onAdd}>
                Add to cart
              </button>
              <Link to="/cart" className="btn btnGhost btnLg">
                View cart
              </Link>
            </div>
            <div className="hint">Stock: {product.stock ?? "—"} • Tags: {(product.tags || []).join(", ")}</div>
          </div>

          <div className="panel">
            <div className="panelTitle">Description</div>
            <div className="prose">{product.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
