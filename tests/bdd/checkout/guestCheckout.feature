@checkout @regression
Feature: Guest checkout

  Background:
    Given Open Automation Test Store home page
    And the shopping cart contains an available product from category "Makeup"
    And I open the shopping cart

  @smoke
  Scenario: Guest checkout can be started from prepared cart
    When Proceed to checkout from cart
    And Continue checkout as guest
    Then Checkout page is displayed

  Scenario: Required checkout fields are validated
    When Proceed to checkout from cart
    And Continue checkout as guest
    And Submit checkout form without required fields
    Then Checkout validation message is displayed

  Scenario: Invalid guest email is rejected
    When Proceed to checkout from cart
    And Continue checkout as guest
    And I fill guest checkout details:
      | field     | value          |
      | firstName | Invalid        |
      | lastName  | Email          |
      | email     | invalid-mail   |
      | telephone | 1234567890     |
      | address1  | 10 Test Road   |
      | city      | Test City      |
      | postcode  | 10001          |
      | country   | United Kingdom |
      | region    | Angus          |
    And Continue checkout form
    Then Checkout validation message contains "E-Mail Address does not appear to be valid"

  Scenario: Guest can fill checkout details from customer profile
    When Proceed to checkout from cart
    And Continue checkout as guest
    And I fill guest checkout details:
      | field     | value                        |
      | firstName | Diploma                      |
      | lastName  | Customer                     |
      | email     | diploma.customer@example.com |
      | telephone | 1234567890                   |
      | address1  | 10 Test Street               |
      | city      | Test City                    |
      | postcode  | 10001                        |
      | country   | United Kingdom               |
      | region    | Angus                        |
    Then Guest checkout details are filled

  Scenario: Guest checkout form keeps entered customer details
    When Proceed to checkout from cart
    And Continue checkout as guest
    And Fill valid guest checkout details
    Then Guest checkout details are filled

  Scenario: Guest can recover from required field validation
    When Proceed to checkout from cart
    And Continue checkout as guest
    And Submit checkout form without required fields
    And Fill valid guest checkout details
    Then Guest checkout details are filled

  Scenario: Guest can continue to checkout confirmation
    When Proceed to checkout from cart
    And Continue checkout as guest
    And Fill valid guest checkout details
    And Continue checkout form
    Then Checkout confirmation is displayed
    And Checkout confirmation contains the selected product

  Scenario: Checkout confirmation shows totals
    When Proceed to checkout from cart
    And Continue checkout as guest
    And Fill valid guest checkout details
    And Continue checkout form
    Then Checkout confirmation totals are displayed

  Scenario: Checkout confirmation shows address and payment method
    When Proceed to checkout from cart
    And Continue checkout as guest
    And Fill valid guest checkout details
    And Continue checkout form
    Then Checkout confirmation address and payment are displayed

  Scenario: Multi-product prepared cart reaches checkout confirmation
    Given the shopping cart contains available products:
      | category | quantity |
      | Makeup   | 1        |
      | Skincare | 1        |
    And I open the shopping cart
    When Proceed to checkout from cart
    And Continue checkout as guest
    And Fill valid guest checkout details
    And Continue checkout form
    Then Checkout confirmation is displayed
    And Checkout confirmation contains the selected products
