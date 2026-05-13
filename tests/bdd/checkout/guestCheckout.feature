@checkout @regression
Feature: Guest checkout

  Background:
    Given Open Automation Test Store home page
    And the shopping cart contains product "Skinsheen Bronzer Stick"
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

  Scenario: Guest can fill checkout details
    When Proceed to checkout from cart
    And Continue checkout as guest
    And Fill valid guest checkout details
    Then Checkout page is displayed

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
