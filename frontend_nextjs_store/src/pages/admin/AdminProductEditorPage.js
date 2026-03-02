import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../app/AppProvider";

// PUBLIC_INTERFACE
export function AdminProductEditorPage() {
  /** Admin product editor for creating/updating products (local-first). */
  const { id } = useParams();
  const isNew = id === "new";
  const { products, actions, adminMedia } = useContext(AppContext);
  const nav = useNavigate();

  const existing = useMemo(() => products.find((p) => p.id === id), [products, id]);

  const [draft, setDraft] = useState(() => {
    if (!isNew && existing) return { ...existing };
    return {
      id: `product-${Math.random().toString(16).slice(2, 8)}`,
      name: "",
      category: "Crystals",
      price: 0,
      shortDescription: "",
      description: "",
      tags: [],
      imageUrls: [],
      stock: 0,
      featured: false
    };
  });

  const [tagInput, setTagInput] = useState((draft.tags || []).join(", "));

  function update(key, value) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function save(e) {
    e.preventDefault();

    // Minimal validation (boundary-like).
    const name = String(draft.name || "").trim();
    if (!name) return;

    const normalized = {
      ...draft,
      name,
      price: Number(draft.price || 0),
      stock: Math.max(0, Math.floor(Number(draft.stock || 0))),
      tags: String(tagInput || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      imageUrls: (draft.imageUrls || []).map((u) => String(u).trim()).filter(Boolean)
    };

    actions.catalog.upsertProduct(normalized);
    nav("/admin/products");
  }

  function addImageUrl(url) {
    const u = String(url || "").trim();
    if (!u) return;
    setDraft((prev) => ({ ...prev, imageUrls: prev.imageUrls.includes(u) ? prev.imageUrls : [u, ...prev.imageUrls] }));
  }

  return (
    <div className="container page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">{isNew ? "New product" : "Edit product"}</h1>
          <p className="muted">Local-first editor with Ocean Professional UI styling.</p>
        </div>
        <Link to="/admin/products" className="btn btnGhost">
          Back
        </Link>
      </div>

      {!isNew && !existing ? (
        <div className="panel">
          <div className="panelTitle">Product not found</div>
          <p className="muted">It may have been deleted. Return to products.</p>
          <Link to="/admin/products" className="btn btnPrimary">
            Go back
          </Link>
        </div>
      ) : (
        <div className="layout2">
          <form className="panel" onSubmit={save}>
            <div className="panelTitle">Details</div>

            <div className="row gap">
              <label className="field" style={{ flex: 1 }}>
                <span className="label">Name</span>
                <input value={draft.name} onChange={(e) => update("name", e.target.value)} required />
              </label>
              <label className="field" style={{ width: 220 }}>
                <span className="label">Category</span>
                <select value={draft.category} onChange={(e) => update("category", e.target.value)}>
                  <option>Crystals</option>
                  <option>Jewelry</option>
                  <option>Incense</option>
                  <option>Tarot</option>
                </select>
              </label>
            </div>

            <div className="row gap">
              <label className="field" style={{ width: 200 }}>
                <span className="label">Price</span>
                <input value={draft.price} onChange={(e) => update("price", e.target.value)} inputMode="decimal" />
              </label>
              <label className="field" style={{ width: 200 }}>
                <span className="label">Stock</span>
                <input value={draft.stock} onChange={(e) => update("stock", e.target.value)} inputMode="numeric" />
              </label>
              <label className="field" style={{ width: 160 }}>
                <span className="label">Featured</span>
                <select value={draft.featured ? "yes" : "no"} onChange={(e) => update("featured", e.target.value === "yes")}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </label>
            </div>

            <label className="field">
              <span className="label">Short description</span>
              <input
                value={draft.shortDescription}
                onChange={(e) => update("shortDescription", e.target.value)}
                placeholder="A calming one-liner…"
              />
            </label>

            <label className="field">
              <span className="label">Description</span>
              <textarea value={draft.description} onChange={(e) => update("description", e.target.value)} rows={5} />
            </label>

            <label className="field">
              <span className="label">Tags (comma separated)</span>
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="calm, intuition" />
            </label>

            <div className="row gap">
              <button className="btn btnPrimary btnLg" type="submit">
                Save product
              </button>
              <Link to={`/product/${draft.id}`} className="btn btnGhost btnLg">
                Preview
              </Link>
            </div>

            <div className="hint">
              Product ID: <code>{draft.id}</code>
            </div>
          </form>

          <aside className="panel">
            <div className="panelTitle">Images</div>

            <div className="row gap">
              <input
                className="input"
                placeholder="Paste image URL and press Add"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImageUrl(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <button
                className="btn btnGhost"
                type="button"
                onClick={() => {
                  // no-op button to hint enter usage
                }}
              >
                Add
              </button>
            </div>

            <div className="mediaGrid">
              {(draft.imageUrls || []).map((u) => (
                <div className="mediaCard" key={u}>
                  <img src={u} alt="" />
                  <div className="row gap" style={{ justifyContent: "space-between" }}>
                    <button
                      className="btn btnGhost"
                      type="button"
                      onClick={() =>
                        update(
                          "imageUrls",
                          (draft.imageUrls || []).filter((x) => x !== u)
                        )
                      }
                    >
                      Remove
                    </button>
                    <a className="btn btnGhost" href={u} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider" />

            <div className="panelTitle">Media library (saved)</div>
            <div className="hint">Add URLs in Admin → Media, then click one here to attach.</div>
            <div className="tagCloud">
              {adminMedia.slice(0, 10).map((u) => (
                <button key={u} type="button" className="tag tagBtn" onClick={() => addImageUrl(u)} title={u}>
                  Use media
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
