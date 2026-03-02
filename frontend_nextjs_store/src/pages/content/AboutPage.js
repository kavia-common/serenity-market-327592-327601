import React from "react";

// PUBLIC_INTERFACE
export function AboutPage() {
  /** Simple content page. */
  return (
    <div className="container page">
      <div className="pageHeader">
        <div>
          <h1 className="h1">About Serenity Market</h1>
          <p className="muted">A modern storefront demo inspired by calm design and spiritual rituals.</p>
        </div>
      </div>

      <div className="panel prose">
        <p>
          Serenity Market is a demo storefront for spiritual essentials—crystals, incense, jewelry, and tarot—designed with
          a clean, modern UI and an included admin CMS.
        </p>
        <p>
          The app is fully functional without a backend: catalog and cart persist locally, while optional env variables can
          enable API integration.
        </p>
      </div>
    </div>
  );
}
