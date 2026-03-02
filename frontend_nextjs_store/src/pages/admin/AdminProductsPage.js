import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../app/AppProvider";
import { getCategories } from "../../domain/products";

// PUBLIC_INTERFACE
export function AdminProductsPage() {
  /** Admin product management list. */
  const { products, actions } = useContext(AppContext);
  const nav = useNavigate();
  const categories = useMemo(() => getCategories(products), [products]);
  const [category, setCategory] = useState("");

  const list = useMemo(() => {
    if (!category) return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  function createNew() {
    nav("/admin/products/new");
  }

  return (
    <div className="container page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Products</h1>
          <p className="muted">Local-first CMS. Changes persist in localStorage.</p>
        </div>
        <button className="btn btnPrimary" onClick={createNew}>
          New product
        </button>
      </div>

      <div className="panel">
        <div className="row gap" style={{ alignItems: "end" }}>
          <label className="field" style={{ width: 260, margin: 0 }}>
            <span className="label">Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <div className="badge">Count: {list.length}</div>
        </div>

        <div className="adminTable">
          <div className="adminRow adminHead">
            <div>Name</div>
            <div>Category</div>
            <div>Price</div>
            <div>Stock</div>
            <div />
          </div>

          {list.map((p) => (
            <div className="adminRow" key={p.id}>
              <div className="strong">{p.name}</div>
              <div className="muted">{p.category}</div>
              <div>${Number(p.price).toFixed(2)}</div>
              <div>{p.stock ?? "—"}</div>
              <div className="row gap" style={{ justifyContent: "flex-end" }}>
                <Link className="btn btnGhost" to={`/admin/products/${p.id}`}>
                  Edit
                </Link>
                <button className="btn btnGhost" onClick={() => actions.catalog.deleteProduct(p.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hint">Tip: Add image URLs via the Media screen and paste them into product images.</div>
      </div>
    </div>
  );
}
