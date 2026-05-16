@navigation @regression
Feature: Header and navigation

  Background:
    Given Open Automation Test Store home page

  @smoke
  Scenario: Header navigation exposes core store actions
    Then Header navigation is displayed

  Scenario: Customer can return home through header navigation
    Given I am on a category page "Makeup"
    When I open home through header navigation
    Then Home page is displayed

  Scenario: Customer can open cart from header navigation
    When I open the shopping cart
    Then Shopping cart is empty

  Scenario: Customer can open account from header navigation
    When I open account through header navigation
    Then Account login page is displayed

  Scenario Outline: Customer can navigate top-level categories
    When Open category "<category>"
    Then at least 1 catalog product is visible

    Examples:
      | category |
      | Makeup   |
      | Skincare |
