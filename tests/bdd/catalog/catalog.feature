@catalog @regression
Feature: Product catalog

  Background:
    Given Open Automation Test Store home page

  @smoke
  Scenario: Search product by name
    When Search for product "Skinsheen Bronzer Stick"
    Then Product "Skinsheen Bronzer Stick" is visible in catalog

  Scenario: Search product by partial keyword
    When Search for product "Bronzer"
    Then Product "Skinsheen Bronzer Stick" is visible in catalog
    And Product "Tropiques Minerale Loose Bronzer" is visible in catalog

  Scenario: Search skincare product by exact name
    When Search for product "Flash Bronzer Body Gel"
    Then Product "Flash Bronzer Body Gel" is visible in catalog

  Scenario: Search unavailable product
    When Search for product "Definitely Missing Product 2026"
    Then No search results are displayed
    And Product "Skinsheen Bronzer Stick" is not visible in catalog

  Scenario: Open product from search results
    When Search for product "Skinsheen Bronzer Stick"
    And Open product "Skinsheen Bronzer Stick"
    Then The page title contains "Skinsheen Bronzer Stick"

  Scenario: Browse product category
    When Open category "Skincare"
    Then Product "Flash Bronzer Body Gel" is visible in catalog

  @smoke
  Scenario: Browse makeup category
    When Open category "Makeup"
    Then Product "Tropiques Minerale Loose Bronzer" is visible in catalog

  Scenario: Open product details from category
    When Open category "Makeup"
    And Open product "Tropiques Minerale Loose Bronzer"
    Then Product details for "Tropiques Minerale Loose Bronzer" are displayed

  Scenario: View product details
    When Search for product "Skinsheen Bronzer Stick"
    And Open product "Skinsheen Bronzer Stick"
    Then Product details for "Skinsheen Bronzer Stick" are displayed
    And Product price is displayed
    And Product add to cart control is available
