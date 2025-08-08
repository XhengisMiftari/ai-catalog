export const PRODUCTS = [
  { id: 1, name: "Velocity Runner 2", price: 89, category: "Shoes", rating: 4.4, description: "Lightweight running shoes for daily training." },
  { id: 2, name: "Trail Grip Pro", price: 129, category: "Shoes", rating: 4.1, description: "Grip and stability for off-road runs." },
  { id: 3, name: "QuietBeat Headphones", price: 199, category: "Electronics", rating: 4.6, description: "Over-ear, noise-cancelling, 30h battery." },
  { id: 4, name: "Swiftbook 13", price: 799, category: "Laptops", rating: 4.2, description: "13-inch ultrabook for work and travel." },
  { id: 5, name: "Swiftbook 15", price: 899, category: "Laptops", rating: 4.5, description: "15-inch performance with long battery." },
  { id: 6, name: "Aero Tee", price: 29, category: "Apparel", rating: 4.0, description: "Breathable tee for training." },
  { id: 7, name: "Hydra Bottle 1L", price: 24, category: "Accessories", rating: 4.3, description: "BPA-free sports bottle." },
  { id: 8, name: "ChefPro Blender", price: 149, category: "Home", rating: 4.1, description: "Powerful blender for smoothies." },
  { id: 9, name: "Focus Mouse", price: 39, category: "Electronics", rating: 4.2, description: "Ergonomic wireless mouse." },
  { id: 10, name: "Comfort Hoodie", price: 59, category: "Apparel", rating: 4.7, description: "Soft fleece hoodie." },
  { id: 11, name: "RoadRunner Socks (3-pack)", price: 19, category: "Accessories", rating: 3.9, description: "Cushioned socks for long runs." },
  { id: 12, name: "City Pack 20L", price: 69, category: "Accessories", rating: 4.5, description: "Everyday backpack for commuters." },
];

export const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];
