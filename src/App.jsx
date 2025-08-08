import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORIES } from "./products";
import { parseQuery, makeFuse, applyFilters } from "./nlp";
import "./index.css";

export default function App() {
  const [text, setText] = useState("");
  const [cat, setCat] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const fuse = useMemo(() => makeFuse(PRODUCTS), []);

  const parsed = parseQuery(text);
  const base = applyFilters(PRODUCTS, parsed);
  const categoryFiltered = cat === "All" ? base : base.filter(p => p.category === cat);
  const priceFiltered = maxPrice ? categoryFiltered.filter(p => p.price <= +maxPrice) : categoryFiltered;

  const fuzzy = parsed.cleaned
    ? fuse.search(parsed.cleaned).map(r => r.item)
    : priceFiltered;

  const shown = Array.from(new Map([...fuzzy, ...priceFiltered].map(p => [p.id, p])).values());

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="px-6 py-5 border-b bg-white">
        <h1 className="text-2xl font-semibold">AI Catalog</h1>
        <p className="text-sm text-gray-500">Natural language search + simple filters (no APIs)</p>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            className="md:col-span-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring"
            placeholder='Try: "running shoes under 100 with good reviews"'
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <div className="flex gap-2">
            <select
              className="w-1/2 rounded-xl border px-3 py-3"
              value={cat}
              onChange={e => setCat(e.target.value)}
            >
              <option>All</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <input
              className="w-1/2 rounded-xl border px-3 py-3"
              type="number"
              min="0"
              placeholder="Max price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          {parsed.price.min ? <span className="px-2 py-1 bg-blue-100 rounded">min ${parsed.price.min}</span> : null}
          {parsed.price.max ? <span className="px-2 py-1 bg-blue-100 rounded">max ${parsed.price.max}</span> : null}
          {parsed.ratingMin ? <span className="px-2 py-1 bg-emerald-100 rounded">rating ≥ {parsed.ratingMin}</span> : null}
          {parsed.catHint ? <span className="px-2 py-1 bg-purple-100 rounded">{parsed.catHint}</span> : null}
          {!shown.length ? <span className="px-2 py-1 bg-red-100 rounded">No matches</span> : null}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map(p => (
            <article key={p.id} className="bg-white rounded-2xl border p-4 shadow-sm hover:shadow">
              <div className="aspect-video bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-gray-400">
                <span className="text-xs">image placeholder</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium">{p.name}</h3>
                <span className="font-semibold">${p.price}</span>
              </div>
              <p className="text-xs text-gray-500">{p.category} • ⭐ {p.rating}</p>
              <p className="text-sm mt-2 text-gray-600">{p.description}</p>
              <button className="mt-3 w-full rounded-xl bg-gray-900 text-white py-2">Add to cart</button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
