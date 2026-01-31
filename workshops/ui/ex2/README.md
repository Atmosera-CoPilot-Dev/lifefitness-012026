# Inventory & Orders Demo (React + in-memory SQLite)

A minimal React app using an in-memory SQLite database via `sql.js` (WebAssembly).
It demonstrates suppliers, products, and orders with transactional stock updates,
multi-item ordering, and an inventory view with search and sorting.

## Quick Start (Windows)

```bash
# From apps/ui/ex2
npm install
npm run dev
```

Open the printed local URL. The app seeds sample suppliers and products on first load.

## Features
- Multi-item orders: add/remove products, per-item quantities, live total preview.
- Stock validation: inline warnings and submit-level errors; transactional rollback on failures.
- Inventory controls: search by name, filter by supplier, sort by name/price/stock.
- Simple ORM-like context: `DbContext` exposes CRUD and order placement.
 - WASM health indicator: a banner checks `/sql-wasm.wasm` and shows status.

## Notes
- Database lives in-memory for the browser session using `sql.js`.
- `DbContext` initializes SQLite, creates tables, seeds data, and exposes simple CRUD.
- `sql-wasm.wasm` is served from the `public/` folder and copied via a `postinstall` script.
	- If the DB fails to initialize, ensure the WASM exists at `public/sql-wasm.wasm`. Run: `node scripts/copy-sql-wasm.js`.

## SQLite on Windows (CLI tools)
- Official downloads: https://www.sqlite.org/download.html
- Get `sqlite-tools-win-x64-<version>.zip` for shell tools.

## React install info
- React docs: https://react.dev/learn/start-a-new-react-project
- NPM package: https://www.npmjs.com/package/react


## Suggested Copilot Prompts
- "Explain how this app works: outline the `DbContext`, database schema and seeding, how React components (`ProductForm`, `InventoryList`, `OrderForm`, `OrdersList`) interact with it, the multi-item order workflow, stock validation/rollback, and how `sql-wasm.wasm` is loaded via the public path."
- "Persist the in-memory SQLite database to `localStorage` or `IndexedDB`: export the SQL.js database to a byte array on changes and reload it on init."
- "Implement supplier and product editing/deleting with inline validation and optimistic UI updates across the inventory list."
- "Add subtotal, taxes, and discounts to orders; update `DbContext` and UI to compute per-item subtotals and final order totals."
- "Add pagination and URL-driven sorting/filtering: keep search/filter/sort state in the URL via React Router and render page controls."
- "Create end-to-end tests with Playwright to verify seeding, product creation, multi-item ordering, stock decrement, and total calculation."
- "Help diagnose and fix issues: analyze Vite dev server setup, `sql-wasm.wasm` loading, and React/sql.js initialization; list likely causes and propose concrete fixes with step-by-step commands."



