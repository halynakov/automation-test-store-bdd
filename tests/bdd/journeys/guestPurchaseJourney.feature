@journey @regression
Feature: Guest purchase journey

  Background:
    Given Open Automation Test Store home page

  Scenario: Guest can move selected product from discovery to checkout
    Given I select an available product from category "Makeup"
    When I add the selected product to cart
    And I open the shopping cart
    Then the cart contains the selected product
    When Set first cart item quantity to 2
    And Proceed to checkout from cart
    And Continue checkout as guest
    And I fill guest checkout details:
      | field     | value                        |
      | firstName | Journey                      |
      | lastName  | Customer                     |
      | email     | journey.customer@example.com |
      | telephone | 1234567890                   |
      | address1  | 20 Journey Street            |
      | city      | Test City                    |
      | postcode  | 10001                        |
      | country   | United Kingdom               |
      | region    | Angus                        |
    Then Guest checkout details are filled
