import React, { useContext, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext } from "../../app/AppProvider";
import { filterProducts, getCategories } from "../../domain/products";

// PUBLIC_INTERFACE
export function CatalogPage() {
  /** Catalog browsing page with filters and search. */
  const { products } = useContext(AppContext);
  const categories = useMemo(() => getCategories(products), [products]);
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(() => params.get("search") || "");
  const [category, setCategory] = useState(() => params.get("category") || "");
  const [minPrice, setMinPrice] = useState(() => params.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(() => params.get("maxPrice") || "");

  const filtered = useMemo(() => {
    return filterProducts(products, {
      search,
      category,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined
    });
  }, [products, search, category, minPrice, maxPrice]);

  function applyParams() {
    const next = {};
    if (search.trim()) next.search = search.trim();
    if (category) next.category = category;
    if (minPrice) next.minPrice = minPrice;
    if (maxPrice) next.maxPrice = maxPrice;
    setParams(next);
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setParams({});
  }

  return (
    <div className="container page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">Catalog</h1>
          <p className="muted">Search, filter, and explore our calming collection.</p>
        </div>
        <div className="badge">Products: {filtered.length}</div>
      </div>

      <div className="layout2">
        <aside className="panel">
          <div className="panelTitle">Filters</div>

          <label className="field">
            <span className="label">Search</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Amethyst, incense…" />
          </label>

          <label className="field">
            <span className="label">Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <div className="row gap">
            <label className="field" style={{ flex: 1 }}>
              <span className="label">Min</span>
              <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" inputMode="decimal" />
            </label>
            <label className="field" style={{ flex: 1 }}>
              <span className="label">Max</span>
              <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="75" inputMode="decimal" />
            </label>
          </div>

          <div className="row gap">
            <button className="btn btnPrimary" onClick={applyParams}>
              Apply
            </button>
            <button className="btn btnGhost" onClick={clearFilters}>
              Clear
            </button>
          </div>

          <div className="hint">Tip: Featured products appear on the homepage.</div>
        </aside>

        <section>
          <div className="grid cards">
            {filtered.map((p) => (
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
                  <div className="tags">
                    {(p.tags || []).slice(0, 3).map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
