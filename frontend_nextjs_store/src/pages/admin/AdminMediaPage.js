import React, { useContext, useState } from "react";
import { AppContext } from "../../app/AppProvider";

// PUBLIC_INTERFACE
export function AdminMediaPage() {
  /** Admin media URL management (frontend-only persistence). */
  const { adminMedia, actions } = useContext(AppContext);
  const [url, setUrl] = useState("");

  function add(e) {
    e.preventDefault();
    actions.adminMedia.add(url);
    setUrl("");
  }

  return (
    <div className="container page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Media</h1>
          <p className="muted">Save commonly used image URLs for reuse in products.</p>
        </div>
        <button className="btn btnGhost" onClick={() => actions.adminMedia.clear()} disabled={!adminMedia.length}>
          Clear library
        </button>
      </div>

      <div className="layout2">
        <form className="panel" onSubmit={add}>
          <div className="panelTitle">Add image URL</div>
          <label className="field">
            <span className="label">URL</span>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
          </label>
          <button className="btn btnPrimary btnLg" type="submit">
            Add to library
          </button>
          <div className="hint">This demo stores URLs in localStorage. No upload is required.</div>
        </form>

        <aside className="panel">
          <div className="panelTitle">Library ({adminMedia.length})</div>
          <div className="mediaGrid">
            {adminMedia.map((u) => (
              <div key={u} className="mediaCard">
                <img src={u} alt="" />
                <div className="row gap" style={{ justifyContent: "space-between" }}>
                  <button className="btn btnGhost" onClick={() => actions.adminMedia.remove(u)}>
                    Remove
                  </button>
                  <a className="btn btnGhost" href={u} target="_blank" rel="noreferrer">
                    Open
                  </a>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
