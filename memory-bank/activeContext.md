# Active Context

## Current Focus

- Enhancing `DoerForm.vue` with validation and mode handling (create/edit) based on `.clinerules/03-Doer.md`.
- Implementing unit tests for `DoerForm.vue` to cover new validation logic and behaviors.

## Recent Changes

- Updated `src/components/DoerForm.vue`:
  - Added a `mode` prop ('create' | 'edit') to control button text ('Create' or 'Update').
  - Implemented input validation for `firstName` and `lastName`:
    - Required field check.
    - 25 character limit.
  - Added display of error messages for each field.
  - The submit button is now disabled if there are validation errors.
  - Removed HTML `required` attributes, relying on script-based validation.
- Created `src/components/__tests__/DoerForm.spec.ts` with unit tests for `DoerForm.vue` using Vitest and Vue Test Utils. Tests cover:
  - Rendering in 'create' and 'edit' modes.
  - Input event emissions.
  - Validation logic for required fields and character limits.
  - Button disabled state based on validation.
  - Form submission event emission for valid forms.
  - Non-emission of submit event for invalid forms.
- Integrated `DoerForm.vue` into `src/views/HomeView.vue` (previous step, still relevant).
  - `HomeView.vue` now manages the state for the form inputs (`firstName`, `lastName`).
  - It handles the `submit-form` event, currently displaying the submitted data on the page and clearing the form.
- Updated `tsconfig.app.json` to include `"baseUrl": "."` (previous step).
- The `doer.model.ts` file (interface `Doer { id: number; firstName: string; lastName: string; }`) was provided by the user (previous step).

## Next Steps

- Implement actual state management for 'Doers' (e.g., using Pinia or a simple reactive array for now).
- Display a list of created 'Doers'.

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
