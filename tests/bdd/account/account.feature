@account @regression
Feature: Customer account access

  Scenario: Account login page is available
    Given Open account login page
    Then Account login page is displayed

  Scenario: Invalid account login is rejected
    Given Open account login page
    When Submit invalid account login credentials
    Then Invalid account login message is displayed

  Scenario: New customer can navigate to create account page
    Given Open account login page
    When Continue as a new registered customer
    Then Create account page is displayed

  Scenario: Empty registration form shows required validation
    Given Open create account page
    When Submit empty registration form
    Then Registration validation messages are displayed

  Scenario: Forgotten password request for unknown account is rejected
    Given Open forgotten password page
    When Submit forgotten password request for unknown account
    Then Forgotten password error message is displayed

  Scenario: Forgotten password page is reachable from login page
    Given Open account login page
    When Open forgotten password from login page
    Then Forgotten password page is displayed
