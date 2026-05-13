# Test Strategy

## Scope

The current MVP focuses on Automation Test Store user journeys that are stable
enough for repeatable E2E execution:

- product search;
- category browsing;
- product details;
- shopping cart operations;
- negative search result handling;
- responsive desktop and mobile smoke coverage;
- guest checkout start and validation.
- API-assisted cart preconditions for faster checkout and cart coverage.

## Suite Tags

| Tag                 | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| `@smoke`            | Minimal high-value checks for quick feedback               |
| `@regression`       | Broader functional coverage for release confidence         |
| `@api-precondition` | Scenarios that prepare cart state through helper/API layer |
| Domain tags         | `@catalog`, `@cart`, `@checkout` group scenarios by area   |

## Current Coverage

| Area           | Covered behavior                                                                    |
| -------------- | ----------------------------------------------------------------------------------- |
| Catalog        | Exact search, partial search, negative search, category browsing, product details   |
| Cart           | UI add flows, API-prepared carts, multiple products, update quantity, remove item   |
| Checkout       | API-prepared guest checkout start, validation, valid detail filling, data retention |
| Mobile/Desktop | Shared smoke scenarios across desktop Chromium and mobile Chrome projects           |

## Desktop and Mobile Split

Desktop and mobile execution is separated by Playwright projects:

- `desktop-chromium` runs desktop Chrome emulation.
- `desktop-firefox` runs desktop Firefox.
- `mobile-chrome` runs Pixel 7 emulation.

The same BDD scenario is reused when the business behavior is the same. Page
Objects and components handle responsive UI differences, for example category
links versus mobile dropdowns. Mobile-only scenarios should receive a dedicated
tag such as `@mobile` only when the business flow differs from desktop.

Recommended commands:

- `npm run test:desktop:smoke`
- `npm run test:desktop:regression`
- `npm run test:mobile:smoke`
- `npm run test:mobile:regression`

## Quality Gates

Before E2E execution, the project validates:

- TypeScript correctness;
- ESLint rules, including Playwright-specific rules;
- Gherkin formatting through Prettier;
- absence of `@only` in feature files.
- absence of inline root page locators inside Page Object/component methods.

## Known Limits

- Tests use a public educational demo site, so network stability can affect runs.
- Payment completion is intentionally not automated.
- Full backend API coverage is out of MVP scope because the public demo site exposes only limited storefront endpoints.

## Future Improvements

- Add more storefront API checks if additional stable public endpoints are discovered.
- Add visual regression for product and cart pages.
- Add scheduled monitoring runs.
- Add sharding for larger suites.
- Add Allure or ReportPortal integration.
- Add test data factories for multiple customer profiles.
