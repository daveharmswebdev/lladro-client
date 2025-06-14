# Tech Context

## Technologies Used

- **Programming Language:** TypeScript
- **Framework:** Vue.js (version as per `package.json`, likely Vue 3)
- **Routing:** `vue-router`
- **Build Tool:** Vite
- **Unit Testing:** Vitest (planned)
- **E2E Testing:** Playwright (planned)
- **Component Development/Testing:** Storybook (planned)
- **Linting:** ESLint (configured via `eslint.config.ts`)
- **Formatting:** Prettier (configured via `.prettierrc.json`)
- **Package Manager:** npm (inferred from `package-lock.json`)

## Development Setup

1.  **Prerequisites:**
    - Node.js and npm installed.
2.  **Clone Repository:** (If applicable)
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173` (or similar, check terminal output).

## Technical Constraints

- This is a learning project, so focus is on understanding and applying Vue.js and related tooling rather than complex backend integrations or performance optimizations at this stage.

## Dependencies

- **Core Vue:** `vue`, `vue-router`
- **Development:** `vite`, `@vitejs/plugin-vue`, `typescript`, `eslint`, `prettier`, `vitest`, `playwright`, `storybook` (some are planned, some are installed by default with Vue CLI).
  (A more detailed list can be derived from `package.json` when needed.)

## Tool Usage Patterns

- **Vite:** Used for fast development server and optimized builds.
- **ESLint & Prettier:** Configured to maintain code quality and consistency. Auto-formatting may be applied by the editor on save.
- **TypeScript:** Used for static typing to improve code maintainability and catch errors early.
- **Git:** For version control (inferred from `.gitignore`, `.gitattributes`).
- **Storybook:** Will be used for isolated component development and showcasing.
- **Vitest:** Will be used for writing unit tests for components and logic.
- **Playwright:** Will be used for end-to-end testing of user flows.
