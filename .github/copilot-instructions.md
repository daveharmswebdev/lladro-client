# Lladro Client - AI Coding Conventions

This document provides AI-driven guidance for developing the Lladro Client application. It covers the project's architecture, development workflows, and coding conventions to ensure consistency and efficiency.

## Project Overview

Lladro Client is a Vue 3 application built with Vite for a fast development experience. It serves as the front-end for a to-do management system, allowing users to manage "doers" (the individuals assigned to tasks) and their corresponding to-dos.

The application uses Pinia for state management, Vue Router for navigation, and is styled with standard CSS. It also integrates Storybook for component development and testing, Vitest for unit tests, and Playwright for end-to-end tests.

## Key Technologies

- **Framework**: Vue 3
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: CSS
- **Component Development**: Storybook
- **Unit Testing**: Vitest
- **End-to-End Testing**: Playwright

## Development Workflow

To get started with the development environment, follow these steps:

1.  **Install Dependencies**:

    ```sh
    npm install
    ```

2.  **Run Development Server**:

    ```sh
    npm run dev
    ```

3.  **Run Tests**:

    - **Unit Tests**:
      ```sh
      npm run test:unit
      ```
    - **End-to-End Tests**:
      ```sh
      npm run test:e2e
      ```

4.  **Linting**:
    ```sh
    npm run lint
    ```

## Architecture and Conventions

The application follows a standard Vue 3 project structure with a few key conventions:

- **Components**: Reusable UI components are located in `src/components`. Each component should have a corresponding Storybook file (e.g., `DoerForm.stories.ts`) to facilitate isolated development and testing.

- **Views**: Page-level components are located in `src/views`. These components are responsible for composing the application's different pages and are linked via Vue Router.

- **State Management**: Global application state is managed with Pinia. State modules are defined in `src/stores` and should be used to share data across components.

- **Models**: Data models, such as `doer.model.ts` and `todo.model.ts`, are defined in `src/models`. These models provide a clear structure for the data used throughout the application.

- **Routing**: The application's routes are defined in `src/router/index.ts`. Each route maps a URL path to a view component.

## Coding Guidelines

- **Component Naming**: Use PascalCase for component file names (e.g., `DoerTable.vue`).
- **Styling**: Use standard CSS for styling. Keep styles scoped to their respective components to avoid conflicts.
- **Testing**:
  - Write unit tests for all components and business logic using Vitest.
  - Create Storybook stories for each component to document its states and variations.
  - Add Playwright tests for critical user flows to ensure end-to-end functionality.

By following these guidelines, we can maintain a clean, consistent, and scalable codebase.
