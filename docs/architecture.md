# Framework Architecture

## Purpose

The project implements a modular BDD automation framework for web application
testing. The framework separates business-readable scenarios, automation steps,
page-level UI abstractions, runtime configuration, fixtures, hooks, and CI/CD
execution.

## Layers

```text
Feature files
  -> BDD step definitions
  -> Framework fixtures
  -> Page Objects
  -> Page Components
  -> API/helper preconditions
  -> Playwright browser automation
  -> Reports, traces, screenshots, CI artifacts
```

## Modules

| Module            | Path                   | Responsibility                                                   |
| ----------------- | ---------------------- | ---------------------------------------------------------------- |
| BDD scenarios     | `tests/bdd`            | Business-readable behavior descriptions in Gherkin               |
| Step definitions  | `src/steps`            | Binding between Gherkin and framework actions                    |
| Fixtures          | `src/fixtures`         | Shared page objects and scenario context                         |
| Page Objects      | `src/pages`            | Encapsulation of UI locators and user actions                    |
| Components        | `src/pages/components` | Reusable page fragments such as header, product list, cart table |
| API helpers       | `src/api`              | Preconditions through real Storefront endpoints                  |
| Runtime config    | `src/config`           | Environment-driven base URL, timeouts, retries, workers          |
| Hooks             | `src/hooks`            | Scenario logging and failure attachments                         |
| Support utilities | `src/support`          | Test data, catalog dictionaries, routes, device helpers          |
| CI/CD             | `.github/workflows`    | Automated quality checks and test execution                      |

## Key Design Decisions

- Page Objects hide selectors from BDD steps.
- Stable locators are declared as `readonly Locator` fields and initialized in constructors only.
- Page methods operate on existing locator fields; inline root page locators are blocked by ESLint.
- Components keep reusable UI modules small and close to the old production framework pattern.
- BDD steps operate on fixtures, not on raw page constructors.
- API/helper preconditions use the real Automation Test Store add-to-cart endpoint instead of fake backend data.
- Runtime values are centralized in `runtimeConfig`.
- CI runs quality gates before browser tests.
- Test suites are selected by tags: `@smoke`, `@regression`, `@api-precondition`.
- Reports and failure artifacts are produced automatically.

## Extension Points

- Add a new page module in `src/pages`.
- Add reusable UI fragments in `src/pages/components`.
- Expose it through `src/fixtures/test.ts`.
- Add business steps in `src/steps`.
- Add Gherkin scenarios under `tests/bdd`.
- Add API setup flows in `src/api` only when the target application exposes a real endpoint.
- Add a new CI input or scheduled run in `.github/workflows/e2e.yml`.
