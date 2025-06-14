# Progress

## What Works

- Basic Vue.js application structure is in place.
- Default boilerplate code has been removed.
- The application can be run using `npm run dev`.
- **Navbar (`src/components/TheNavbar.vue`):**
  - Created and integrated into `src/App.vue`.
  - Provides links to Home, Doers, Todos, and Regions.
- **Routing (`src/router/index.ts`):**
  - Configured for `/` (HomeView), `/doers` (DoersView), `/todos` (TodosView), and `/regions` (RegionsView).
- **Views:**
  - `src/views/HomeView.vue` (existing, simple page).
  - `src/views/DoersView.vue`: Created, integrates `DoerForm` and a stubbed `DoerTable`. Handles `DoerForm` submission.
  - `src/views/TodosView.vue`: Created (stub).
  - `src/views/RegionsView.vue`: Created (stub).
- **Doer Creation Form (`src/components/DoerForm.vue`):**
  - Enhanced stateless (presentational) component.
  - Accepts `firstName`, `lastName`, and `mode` ('create' | 'edit') as props.
  - Implements validation for `firstName` and `lastName` (required, 25-character limit).
  - Displays error messages for invalid inputs.
  - Submit button text changes based on `mode` ('Create' or 'Update').
  - Submit button is disabled if the form is invalid.
  - Emits `update:firstName`, `update:lastName` for two-way binding.
  - Emits `submit-form` with `{ firstName, lastName }` payload on valid submission.
- **Doer Table (`src/components/DoerTable.vue`):**
  - Created as a stub component.
- **Unit Tests:**
  - `src/components/__tests__/DoerForm.spec.ts` (comprehensive tests exist).
  - `src/components/__tests__/DoerTable.spec.ts` (created with placeholder tests).
- `tsconfig.app.json` includes `"baseUrl": "."`.
- **Doer Model (`src/models/doer.model.ts`):**
  - Updated to include `totalTodos?: number`.
- **Storybook:**
  - Storybook is set up.
  - `src/components/DoerForm.stories.ts` exists.
  - `src/components/DoerTable.stories.ts` created (with placeholder stories).

## What's Left to Build

- **Core 'Doer' Functionality:**
  - **`DoerTable.vue` Implementation:**
    - Display list of 'Doers' with columns: id, firstname, lastname, total todos (as per `.clinerules/03-Doer.md`).
    - Implement pagination (5 doers per page).
    - Implement sorting (id, firstname, lastname).
    - Display "You currently do not have any doers." message when applicable.
  - Editing an existing 'Doer' (The `DoerForm` supports 'edit' mode, but workflow integration in `DoersView.vue` is needed).
  - Deleting a 'Doer'.
- **State Management for 'Doers':** (e.g., Pinia, or a simple reactive array in a composable for now). `DoersView.vue` currently uses a local reactive array.
- **Styling:** Enhanced styling for navbar, 'Doer' components, and overall application.
- **Testing:**
  - Unit tests (Vitest) for `DoersView.vue`, `DoerTable.vue`, and other future components/logic.
  - Component tests/showcase (Storybook) for `DoerTable.vue` (scenarios from `.clinerules/03-Doer.md`).
  - End-to-end tests (Playwright) for user flows involving 'Doers'.
- **Persistence:** (Optional, e.g., using local storage or a backend API for 'Doers').
- **ID Generation:** Current `DoersView.vue` uses `Date.now()` for ID; a more robust strategy is needed.
- **Todos & Regions Pages:** Implement actual content for `TodosView.vue` and `RegionsView.vue`.
- **Navbar User Name:** Implement dynamic user name display.

## Current Status

- **Phase:** Feature Development - Navbar and Page Structure.
- Navbar and basic page routing for Home, Doers, Todos, and Regions are implemented.
- `DoersView.vue` now hosts `DoerForm.vue` and a stub `DoerTable.vue`.
- `DoerForm.vue` correctly emits data, and `DoersView.vue` can receive it.
- The project is ready for implementing `DoerTable.vue` functionality.

## Known Issues

- **IDE Path Resolution:** Vetur/Volar (Vue language server in VS Code) might show errors for `@/*` path aliases (e.g., in `src/App.vue`, `src/views/DoersView.vue`). The update to `tsconfig.app.json` (adding `"baseUrl": "."`) aims to fix this. If errors persist, restarting the VS Code TypeScript server or VS Code itself is recommended.
- The application currently has no persistent storage or advanced state management for 'Doers' beyond the local array in `DoersView.vue`.
- Styling is minimal.
- `DoerTable.vue` is just a stub.

## Evolution of Project Decisions

- **Initial Decision (Implicit):** Start with a fresh Vue CLI project.
- **First Action:** Remove boilerplate to create a clean slate.
- **DoerForm Design:** Implemented `DoerForm.vue` as a stateless component.
- **ESLint/Template Typing:** Refactored event handling in `DoerForm.vue`.
- **DoerForm Enhancements:** Updated `DoerForm.vue` with validation, error display, and 'create'/'edit' modes.
- **Navbar and Page Structure:**
  - Created `TheNavbar.vue` and integrated it.
  - Created `DoersView.vue`, `TodosView.vue` (stub), `RegionsView.vue` (stub).
  - Updated router configuration.
  - Created `DoerTable.vue` (stub).
  - Integrated `DoerForm.vue` and `DoerTable.vue` into `DoersView.vue`.
  - Updated `DoerForm.vue` to emit data with its `submit-form` event.
  - Shifted Doer creation logic from `HomeView.vue` to `DoersView.vue`.
- **DoerTable Stories, Model & Unit Tests (Current Task):**
  - Created `src/components/DoerTable.stories.ts` with placeholder stories.
  - Updated `src/models/doer.model.ts` to include `totalTodos`.
  - Created `src/components/__tests__/DoerTable.spec.ts` with placeholder unit tests.
