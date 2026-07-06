# AI Agent Instructions for VIPER E-Commerce Frontend

## Project overview
- Vite + React + TypeScript + Tailwind CSS (Tailwind v4 plugin).
- Single-page frontend with local catalog and cart state stored in `localStorage`.
- No backend or API layer is present in this workspace.

## Key files
- `src/main.tsx` — React entry point.
- `src/App.tsx` — main application UI and page structure.
- `src/context/CartContext.tsx` — shopping cart, wishlist, product CRUD, localStorage persistence, catalog versioning.
- `src/data/products.ts` — product catalog and type definitions. Use this file for product seed data and category metadata.
- `src/index.css` — global styling and Tailwind theme definitions.
- `src/utils/cn.ts` — className merge helper using `clsx` + `tailwind-merge`.

## Build and dev commands
- `npm install`
- `npm run dev` — start Vite dev server.
- `npm run build` — build production bundle.
- `npm run preview` — preview the production build.

## Conventions
- Use TypeScript with strict types. Do not introduce `any` unless absolutely necessary.
- Keep UI state inside `CartProvider` and use `useCart()` only within components wrapped by that provider.
- The product catalog is dynamic: `productsList` is initialized from `src/data/products.ts`, then persisted to `localStorage`.
- Changing `CATALOG_VERSION` in `src/context/CartContext.tsx` forces a refresh of the saved product catalog.
- Styling combines Tailwind classes and custom CSS class names defined in `src/index.css`.
- Use the alias `@/` for imports from `src/`.

## Useful guidance for code changes
- For product or category updates, edit `src/data/products.ts` and preserve the `Product` interface shape.
- Preserve the existing French UI labels and anchor sections such as `#accueil`, `#boutique`, `#apropos`, and `#contact`.
- Avoid adding a backend or API integration unless a new architecture is explicitly requested.
- Prefer local state and React hooks over global variables.

## What this file is for
This file helps AI agents quickly understand the app structure, data flow, and styling approach and avoid making unsupported assumptions about backend or architecture.