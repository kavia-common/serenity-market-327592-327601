/**
 * Domain module: products
 *
 * Pure-ish helpers for catalog filtering/searching and demo data.
 */

// PUBLIC_INTERFACE
export function getDemoProducts() {
  /** Returns a demo set of spiritual products used when no backend is connected. */
  return [
    {
      id: "crystal-amethyst-001",
      name: "Amethyst Cluster",
      category: "Crystals",
      price: 29.0,
      shortDescription: "Calming energy for clarity and balance.",
      description:
        "A natural amethyst cluster with deep violet points. Traditionally associated with calm, intuition, and peaceful sleep.",
      tags: ["calm", "intuition", "sleep"],
      imageUrls: ["https://images.unsplash.com/photo-1615486364462-ef6366b4d7f7?auto=format&fit=crop&w=1200&q=80"],
      stock: 18,
      featured: true
    },
    {
      id: "jewelry-moonstone-002",
      name: "Moonstone Pendant",
      category: "Jewelry",
      price: 44.0,
      shortDescription: "Soft shimmer, feminine energy, and new beginnings.",
      description:
        "A minimalist moonstone pendant on a delicate chain. Often linked to renewal, emotional balance, and gentle protection.",
      tags: ["renewal", "balance"],
      imageUrls: ["https://images.unsplash.com/photo-1617038260897-41a02a293b46?auto=format&fit=crop&w=1200&q=80"],
      stock: 9,
      featured: true
    },
    {
      id: "incense-sandalwood-003",
      name: "Sandalwood Incense",
      category: "Incense",
      price: 12.5,
      shortDescription: "Warm, grounding aroma for meditation.",
      description:
        "Hand-rolled sandalwood incense sticks. Excellent for creating a calm ritual space and grounding after a long day.",
      tags: ["grounding", "meditation"],
      imageUrls: ["https://images.unsplash.com/photo-1611075385937-2b8fa2a343b3?auto=format&fit=crop&w=1200&q=80"],
      stock: 30,
      featured: false
    },
    {
      id: "tarot-riderwaite-004",
      name: "Classic Tarot Deck",
      category: "Tarot",
      price: 27.0,
      shortDescription: "A timeless deck for readings and learning.",
      description:
        "A classic Rider–Waite inspired deck with a guidebook. Great for beginners and experienced readers alike.",
      tags: ["guidance", "insight"],
      imageUrls: ["https://images.unsplash.com/photo-1615397349517-4f1a1a2b775d?auto=format&fit=crop&w=1200&q=80"],
      stock: 14,
      featured: true
    },
    {
      id: "crystal-rosequartz-005",
      name: "Rose Quartz Tumbled Stone",
      category: "Crystals",
      price: 9.0,
      shortDescription: "Gentle support for compassion and self-love.",
      description:
        "Smooth tumbled rose quartz—pocket-friendly and perfect for everyday comfort. Often associated with love, softness, and heart-centered healing.",
      tags: ["love", "comfort"],
      imageUrls: ["https://images.unsplash.com/photo-1615486364210-316f52c5f05a?auto=format&fit=crop&w=1200&q=80"],
      stock: 50,
      featured: false
    }
  ];
}

// PUBLIC_INTERFACE
export function getCategories(products) {
  /** Returns a sorted list of unique categories. */
  return Array.from(new Set((products || []).map((p) => p.category))).sort((a, b) => a.localeCompare(b));
}

// PUBLIC_INTERFACE
export function filterProducts(products, query) {
  /**
   * Filters products by category, search text, tags, and price range.
   *
   * query = { search?: string, category?: string, minPrice?: number, maxPrice?: number }
   */
  const q = query || {};
  const search = (q.search || "").trim().toLowerCase();
  const category = (q.category || "").trim();
  const minPrice = typeof q.minPrice === "number" ? q.minPrice : null;
  const maxPrice = typeof q.maxPrice === "number" ? q.maxPrice : null;

  return (products || []).filter((p) => {
    if (category && p.category !== category) return false;

    if (minPrice != null && Number(p.price) < minPrice) return false;
    if (maxPrice != null && Number(p.price) > maxPrice) return false;

    if (!search) return true;
    const hay = `${p.name} ${p.shortDescription || ""} ${p.description || ""} ${(p.tags || []).join(" ")}`.toLowerCase();
    return hay.includes(search);
  });
}
