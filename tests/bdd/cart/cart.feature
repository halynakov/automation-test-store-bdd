@cart @regression
Feature: Shopping cart

  Background:
    Given Open Automation Test Store home page

  Scenario: Empty cart is displayed when opened directly
    Given I open the shopping cart
    Then Shopping cart is empty

  @smoke
  Scenario: Customer can add selected product to cart
    Given I select an available product from category "Skincare"
    When I add the selected product to cart
    And I open the shopping cart
    Then the cart contains the selected product

  Scenario Outline: Customer can update selected product quantity
    Given I select an available product from category "<category>"
    When I add the selected product to cart
    And I open the shopping cart
    And Set first cart item quantity to <quantity>
    Then the cart contains the selected product
    And First cart item quantity is <quantity>
    And First cart item row total matches quantity <quantity>

    Examples:
      | category | quantity |
      | Makeup   | 2        |
      | Skincare | 3        |

  Scenario: Customer can remove selected product from cart
    Given I select an available product from category "Makeup"
    When I add the selected product to cart
    And I open the shopping cart
    And Remove the first item from cart
    Then Shopping cart is empty

  Scenario: Customer can add selected product from details page
    Given I select an available product from category "Makeup"
    When I open the selected product
    And Add the current product to cart
    And I open the shopping cart
    Then the cart contains the selected product

  Scenario: Cart supports products from different categories
    Given the shopping cart contains available products:
      | category | quantity |
      | Makeup   | 1        |
      | Skincare | 1        |
    When I open the shopping cart
    Then the cart contains the selected products
    And Cart header item count matches selected products
    And Cart totals are displayed

  Scenario: Prepared cart can proceed to checkout
    Given the shopping cart contains available products:
      | category | quantity |
      | Makeup   | 1        |
      | Skincare | 1        |
    When I open the shopping cart
    And Proceed to checkout from cart
    Then Checkout account selection is displayed

  Scenario: Prepared cart displays unit price and totals
    Given the shopping cart contains an available product from category "Makeup"
    When I open the shopping cart
    Then First cart item has a unit price
    And Cart totals are displayed

  Scenario: Cart total includes flat shipping
    Given the shopping cart contains an available product from category "Makeup"
    When I open the shopping cart
    Then Cart total equals subtotal plus shipping
    And Cart total is greater than subtotal

  Scenario: Multi-product cart displays calculated totals
    Given the shopping cart contains available products:
      | category | quantity |
      | Makeup   | 2        |
      | Skincare | 1        |
    When I open the shopping cart
    Then the cart contains the selected products
    And Cart total equals subtotal plus shipping
