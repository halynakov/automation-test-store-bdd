# Test Data Strategy

## Goal

The framework avoids making most BDD scenarios depend on specific live catalog
items. A public demo catalog can change without notice, so the main regression
suite uses deterministic product discovery instead of true random data.

## Strategy

- Keep one known product scenario as a canary check for stable search behavior.
- Use category-level product discovery for general catalog, cart, and checkout flows.
- Store selected products in `ScenarioContext` so later steps assert the exact item
  selected earlier in the same scenario.
- Use typed catalog data only where the application requires product IDs for
  API-assisted preconditions.
- Do not mock the main E2E catalog, cart, or checkout flows.

## Deterministic Discovery

Dynamic scenarios select the first addable product from a category page. This is
not random: the same category and current catalog state produce the same product,
which keeps failures reproducible.

Example:

```gherkin
Given I select an available product from category "Makeup"
When I add the selected product to cart
Then the cart contains the selected product
```

The selected product name, category, product ID, price, and quantity are stored
in scenario context.

## Data Tables

Data Tables are used when the scenario naturally contains business data:

- category and quantity combinations for cart setup;
- customer profile data for guest checkout.

They are not used to list arbitrary live product names because that makes the
specification brittle.

## Mocks

Mocks are intentionally out of the main E2E suite. They would be useful for
separate edge-case coverage such as backend errors, empty catalog states, or
third-party integrations, but they should live in a dedicated mocked suite and
not replace real storefront E2E checks.
