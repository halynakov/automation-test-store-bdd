@cart @regression
Feature: Shopping cart

  Background:
    Given Open Automation Test Store home page

  @smoke
  Scenario: Add product to cart from catalog
    When Search for product "Skinsheen Bronzer Stick"
    And Add the first listed product to cart
    And Open shopping cart
    Then Cart contains product "Skinsheen Bronzer Stick"

  Scenario: Update product quantity in cart
    When Search for product "Skinsheen Bronzer Stick"
    And Add the first listed product to cart
    And Open shopping cart
    And Set first cart item quantity to 2
    Then Cart contains product "Skinsheen Bronzer Stick"
    And First cart item quantity is 2

  Scenario: Remove product from cart
    When Search for product "Skinsheen Bronzer Stick"
    And Add the first listed product to cart
    And Open shopping cart
    And Remove the first item from cart
    Then Shopping cart is empty

  Scenario: Add product to cart from details page
    When Search for product "Skinsheen Bronzer Stick"
    And Open product "Skinsheen Bronzer Stick"
    And Add the current product to cart
    And Open shopping cart
    Then Cart contains product "Skinsheen Bronzer Stick"

  Scenario: Add two different products to cart
    When Search for product "Skinsheen Bronzer Stick"
    And Add the first listed product to cart
    And Search for product "Tropiques Minerale Loose Bronzer"
    And Add the first listed product to cart
    And Open shopping cart
    Then Cart contains product "Skinsheen Bronzer Stick"
    And Cart contains product "Tropiques Minerale Loose Bronzer"

  @smoke
  Scenario: Prepared cart contains one product
    Given the shopping cart contains product "Skinsheen Bronzer Stick"
    When I open the shopping cart
    Then Cart contains product "Skinsheen Bronzer Stick"
    And Cart header item count is 1

  Scenario: Prepared cart contains multiple products
    Given the shopping cart contains products:
      | Skinsheen Bronzer Stick           |
      | Tropiques Minerale Loose Bronzer  |
    When I open the shopping cart
    Then Cart contains product "Skinsheen Bronzer Stick"
    And Cart contains product "Tropiques Minerale Loose Bronzer"
    And Cart header item count is 2

  Scenario: Update product quantity from prepared cart
    Given the shopping cart contains product "Skinsheen Bronzer Stick"
    When I open the shopping cart
    And Set first cart item quantity to 2
    Then Cart contains product "Skinsheen Bronzer Stick"
    And First cart item quantity is 2

  Scenario: Remove product from prepared cart
    Given the shopping cart contains product "Skinsheen Bronzer Stick"
    When I open the shopping cart
    And Remove the first item from cart
    Then Shopping cart is empty

  Scenario: Prepared cart can proceed to checkout
    Given the shopping cart contains products:
      | Skinsheen Bronzer Stick           |
      | Tropiques Minerale Loose Bronzer  |
    When I open the shopping cart
    And Proceed to checkout from cart
    Then Checkout account selection is displayed
