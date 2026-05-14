# Automation Test Store BDD Framework

Modular E2E automation framework for the educational e-commerce site
[Automation Test Store](https://automationteststore.com/).

The project is intentionally built as a clean diploma-ready version of a professional
Playwright BDD framework pattern: feature files describe business scenarios, step
definitions connect Gherkin to automation code, page objects isolate UI details, and
GitHub Actions runs selected suites in CI.

Repository target: [github.com/halynakov/automation-test-store-bdd](https://github.com/halynakov/automation-test-store-bdd).

## Stack

- TypeScript
- Playwright Test
- playwright-bdd
- Gherkin feature files
- ESLint and Prettier
- GitHub Actions
- Playwright HTML report, traces, screenshots, and videos on failure

## Project Structure

```text
automation-test-store-bdd/
  tests/bdd/              # Gherkin feature files
  src/steps/              # BDD step definitions
  src/fixtures/           # Shared framework fixtures
  src/hooks/              # Scenario lifecycle hooks
  src/config/             # Runtime configuration
  src/pages/              # Page Object classes
  src/pages/components/   # Reusable UI components with constructor locators
  src/api/                # API/helper preconditions
  src/support/            # Test data, selected product context, and helpers
  docs/                   # Architecture, CI/CD, and test strategy notes
  eslint-rules/           # Project-specific lint rules
  .github/workflows/      # CI/CD pipeline
```

## Installation

```bash
npm install
npx playwright install
```

Create a local `.env` from `.env.example` if you need to override the base URL.

## Running Tests

Generate tests from feature files:

```bash
npm run bddgen
```

Run smoke suite:

```bash
npm run test:smoke
```

Run regression suite:

```bash
npm run test:regression
```

Run explicit desktop/mobile suites:

```bash
npm run test:desktop:smoke
npm run test:desktop:regression
npm run test:mobile:smoke
npm run test:mobile:regression
```

Run quality gates:

```bash
npm run quality
```

Open HTML report:

```bash
npm run report
```

## CI/CD

The GitHub Actions workflow supports:

- automatic quality gates and smoke execution on pull requests and pushes;
- manual `workflow_dispatch` runs;
- suite selection by tag: `@smoke` or `@regression`;
- browser project selection: desktop Chromium, desktop Firefox, or mobile Chrome;
- uploading Playwright HTML report and raw test results as artifacts.
- scheduled regression execution for desktop Chromium and mobile Chrome.

## Framework Modules

- `runtimeConfig` centralizes environment-driven settings.
- `fixtures/test.ts` creates reusable Page Object fixtures.
- `scenario.hooks.ts` logs scenario lifecycle and attaches failure screenshots.
- Page Objects and components isolate UI selectors from business steps.
- All stable locators are constructor-initialized `readonly Locator` fields.
- `StorefrontClient` prepares cart state through real storefront endpoints.
- `ProductDiscoveryService` selects available products deterministically and stores them in scenario context.
- Feature files remain readable and independent from implementation details.

## Diploma Scope

The MVP focuses on stable user journeys:

- product search;
- category browsing;
- product details;
- shopping cart;
- negative search result handling;
- responsive desktop/mobile smoke coverage;
- guest checkout start;
- required field validation.
- API-prepared cart and checkout preconditions.
- deterministic selected-product flows without broad hardcoded SKU lists.

Future improvements can include deeper API checks, visual regression, Allure/ReportPortal,
Docker Compose test environment, parallel sharding, and scheduled monitoring runs.

See also:

- `docs/architecture.md`
- `docs/ci-cd.md`
- `docs/preconditions.md`
- `docs/test-data-strategy.md`
- `docs/test-strategy.md`
