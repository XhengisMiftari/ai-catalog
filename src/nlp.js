import Fuse from "fuse.js";

export function parseQuery(q) {
  const query = (q || "").toLowerCase();

  // price
  let price = {};
  const between = query.match(/(?:between|from)\s*(\d+)\s*(?:and|to)\s*(\d+)/);
  const under = query.match(/(?:under|below|<=?)\s*(\d+)/);
  const over = query.match(/(?:over|above|>=?)\s*(\d+)/);
  if (between) price = { min: +between[1], max: +between[2] };
  else if (under) price = { max: +under[1] };
  else if (over) price = { min: +over[1] };

  // rating
  let ratingMin;
  const ratingNum = query.match(/(\d(?:\.\d)?)\s*\+?\s*(?:stars?|rating)/) || query.match(/rating\s*(?:at\s*least|>=?)\s*(\d(?:\.\d)?)/);
  if (ratingNum) ratingMin = +ratingNum[1];
  if (!ratingMin && /good reviews|highly rated|great reviews/.test(query)) ratingMin = 4;

  // category hint
  let catHint;
  const catMap = {
    shoes: ["shoes", "sneakers", "running"],
    electronics: ["electronics", "headphones", "mouse", "earbuds"],
    laptops: ["laptop", "ultrabook", "notebook"],
    apparel: ["hoodie", "shirt", "tee", "apparel", "clothes"],
    accessories: ["socks", "bottle", "backpack", "pack", "accessories"],
    home: ["kitchen", "home", "blender"]
  };
  for (const [cat, keys] of Object.entries(catMap)) {
    if (keys.some(k => query.includes(k))) { catHint = cat.charAt(0).toUpperCase()+cat.slice(1); break; }
  }

  const cleaned = query
    .replace(/under|below|over|above|between|from|and|to|rating|stars?|good reviews|highly rated|great reviews|at least|>=?|<=?/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return { price, ratingMin, catHint, cleaned };
}

export function makeFuse(products) {
  return new Fuse(products, {
    keys: ["name", "description", "category"],
    threshold: 0.35,
    ignoreLocation: true
  });
}

export function applyFilters(products, { price, ratingMin, catHint }) {
  return products.filter(p => {
    const okPrice = (!price.min || p.price >= price.min) && (!price.max || p.price <= price.max);
    const okRating = (!ratingMin || p.rating >= ratingMin);
    const okCat = (!catHint || p.category === catHint);
    return okPrice && okRating && okCat;
  });
}
