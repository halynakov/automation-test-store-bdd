# Preconditions

## Goal

Preconditions prepare scenario state without duplicating slow UI setup in every
test. This keeps BDD scenarios focused on the behavior under test while still
using real Automation Test Store behavior.

## API-Assisted Preconditions

The framework uses the real AbanteCart storefront AJAX endpoint:

```text
GET /index.php?rt=r/product/product/addToCart&product_id=<id>
```

Supported BDD steps:

- `Given the shopping cart contains product "Skinsheen Bronzer Stick"`
- `Given the shopping cart contains products:`
- `Given the shopping cart contains an available product from category "Makeup"`
- `Given the shopping cart contains available products:`
- `Given I open the shopping cart`

Product IDs and category routes are typed in `src/support/catalog.ts`. Route
construction is centralized in `src/support/routes.ts`.

Dynamic preconditions first discover an addable product from a category page,
store it in scenario context, and then use the real storefront add-to-cart
endpoint with the discovered product ID.

## Limits

The demo site does not expose a stable public API for full checkout creation,
cart cleanup, payment, or customer registration. Those flows remain UI-driven or
are intentionally left out of MVP scope.

## Rule

Do not mock backend state for E2E scenarios. Add a helper only when the target
application exposes a real route or endpoint that can be validated.
