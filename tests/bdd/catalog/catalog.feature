@catalog @regression
Feature: Product catalog

  Background:
    Given Open Automation Test Store home page

  @smoke
  Scenario: Known catalog product can be found by name
    When Search for product "Skinsheen Bronzer Stick"
    Then Product "Skinsheen Bronzer Stick" is visible in catalog

  Scenario: Customer can find an available product by name
    Given I select an available product from category "Makeup"
    When I search for the selected product by name
    Then the selected product is visible in catalog

  Scenario: Search unavailable product
    When Search for product "Definitely Missing Product 2026"
    Then No search results are displayed

  Scenario Outline: Category exposes available products
    When Open category "<category>"
    Then at least 1 catalog product is visible

    Examples:
      | category |
      | Makeup   |
      | Skincare |

  @smoke
  Scenario: Customer can select an available makeup product
    Given I select an available product from category "Makeup"
    Then the selected product is visible in catalog

  Scenario: Customer can open selected product details
    Given I select an available product from category "Makeup"
    When I open the selected product
    Then selected product details are displayed
    And Product price is displayed
    And Product add to cart control is available
