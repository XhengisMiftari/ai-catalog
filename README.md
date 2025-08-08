🛍️ AI Catalog (React + Tailwind + Fuse.js)
An AI-powered product catalog with natural language search using Fuse.js for fuzzy matching. Search by typing queries like:

"running shoes under 100 with good reviews"
"laptops between 700 and 900 rating at least 4"

Built with React (Vite), Tailwind CSS, and JavaScript.

🔧 Requirements
Node.js v20.17+ (or newer)

npm v10+

🚀 Quick Start
bash
Copy
Edit
npm install
npm run dev
# Open the localhost URL shown in your terminal
📂 Project Structure
bash
Copy
Edit
src/
  assets/         # Static assets (e.g., icons, placeholders)
  products.js     # Sample product data
  nlp.js          # Natural language parsing and filtering logic
  App.jsx         # Main app UI
  index.css       # Tailwind styles
  main.jsx        # Entry point
🧪 Features
Natural Language Search (price, rating, category)

Fuzzy Matching for typos and partial matches

Category & Price Filters via dropdown and input

Responsive Grid Layout for product cards

No API calls – works fully in the browser

📝 Notes
nlp.js parses the query and applies filters before fuzzy search

Mobile-first design with responsive product grid

Simple placeholder for product images (can be replaced with real ones)

🧰 Scripts
bash
Copy
Edit
npm run dev        # Start development server
npm run build      # Build for production (output in /dist)
npm run preview    # Preview the production build locally
