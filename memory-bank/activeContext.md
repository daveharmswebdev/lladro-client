# Active Context

## Current Focus

- Implementing Navbar and basic page structure (Home, Doers, Todos, Regions) as per `.clinerules/04-nav.md`.
- Integrating `DoerForm.vue` and a stubbed `DoerTable.vue` into the new `DoersView.vue`.
- Ensuring `DoerForm.vue` correctly emits data for `DoersView.vue` to handle.

## Recent Changes

- **Navbar Implementation:**
  - Created `src/components/TheNavbar.vue` with links to Home, Doers, Todos, and Regions.
  - Integrated `TheNavbar.vue` into `src/App.vue`.
- **View Creation:**
  - Created `src/views/DoersView.vue`.
  - Created `src/views/TodosView.vue` (stub).
  - Created `src/views/RegionsView.vue` (stub).
- **Router Configuration:**
  - Updated `src/router/index.ts` to include routes for `/`, `/doers`, `/todos`, and `/regions`.
- **Doer Components:**
  - Created `src/components/DoerTable.vue` (stub).
  - Integrated `DoerForm.vue` and `DoerTable.vue` into `src/views/DoersView.vue`.
  - `DoersView.vue` now handles `DoerForm` submission (currently logs to console and adds to a local reactive list).
- **`DoerForm.vue` Update:**
  - Modified `DoerForm.vue` to emit `submit-form` with a payload: `{ firstName: string; lastName: string }`. This aligns with `DoersView.vue`'s handler.
- **Previous `DoerForm.vue` enhancements (still relevant):**
  - Added a `mode` prop ('create' | 'edit').
  - Implemented input validation (required, 25 char limit) and error messages.
  - Submit button disabled on validation errors.
- **Previous Unit Tests (still relevant):**
  - `src/components/__tests__/DoerForm.spec.ts` covers `DoerForm.vue`'s logic.
- **Previous `HomeView.vue` integration (now superseded by `DoersView.vue` for Doer management):**
  - `HomeView.vue` previously managed `DoerForm` state. This responsibility is shifting to `DoersView.vue`.
- `tsconfig.app.json` includes `"baseUrl": "."`.
- **`doer.model.ts` Update:**
  - Updated `Doer` interface to include `totalTodos?: number`.
- **Storybook:**
  - Storybook is set up.
  - `src/components/DoerForm.stories.ts` exists.
  - Created `src/components/DoerTable.stories.ts` (with placeholder stories).
- **Unit Tests:**
  - `src/components/__tests__/DoerForm.spec.ts` exists.
  - Created `src/components/__tests__/DoerTable.spec.ts` (with placeholder tests for "no doers", pagination, sorting).

## Next Steps

- Implement the `DoerTable.vue` component as per `.clinerules/03-Doer.md` (columns, pagination, sorting, no-doers message).
- Flesh out unit tests in `src/components/__tests__/DoerTable.spec.ts` once `DoerTable.vue` is functional.
- Flesh out `DoerTable.stories.ts` with actual scenarios once `DoerTable.vue` is functional.
- Implement actual state management for 'Doers' (e.g., using Pinia).
- Style the application, including the navbar and new views/components.
- Address Vetur path alias errors if they persist (may require IDE/TS server restart).

## Active Decisions & Considerations

- Confirmed the use of a stateless (presentational) component pattern for `DoerForm.vue` as per user preference for easier testing and Storybook integration.
- The `id` field for a `Doer` is not handled by the form; it will need to be managed by a backend or a client-side generation strategy later.
- Path alias resolution (`@/*`) in `tsconfig.app.json` might require IDE/TS server restarts to be fully recognized after changes.

## Important Patterns & Preferences

- Follow Vue.js best practices.
- Maintain clean and readable code.
- Use Single File Components (.vue files).

## Learnings & Project Insights

- The initial Vue CLI project contains a fair amount of boilerplate that needs to be cleaned up for a fresh start.
- Understanding the default file structure helps in identifying what to remove or modify.
- Stateless (presentational) components in Vue, which receive data via props and emit events for changes, are well-suited for unit testing and Storybook.
- Type assertions like `(event.target as HTMLInputElement)` directly in Vue templates can cause parsing issues with ESLint/Vetur; moving this logic to `<script setup>` methods is a cleaner solution.
- Path aliases (e.g., `@/*`) in Vue/TypeScript projects sometimes require an explicit `"baseUrl"` in `tsconfig.json` for IDEs and language services (like Vetur/Volar) to correctly resolve module paths. A restart of the TS server or IDE might be necessary after such changes.
