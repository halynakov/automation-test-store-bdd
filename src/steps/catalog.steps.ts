import { Given, When, Then } from './bdd'
import { getLatestSelectedProduct } from '../support/scenarioContext'

Given('I select an available product from category {string}', async ({ productDiscovery }, categoryName: string) => {
  await productDiscovery.selectAvailableProductFromCategory(categoryName)
})

When('Search for product {string}', async ({ pages }, productName: string) => {
  await pages.home.searchFor(productName)
})

When('I search for the selected product by name', async ({ productDiscovery }) => {
  await productDiscovery.searchForLatestSelectedProductByName()
})

When('Open category {string}', async ({ pages }, categoryName: string) => {
  await pages.home.openCategory(categoryName)
})

When('Open product {string}', async ({ pages }, productName: string) => {
  await pages.product.openProduct(productName)
})

When('I open the selected product', async ({ productDiscovery }) => {
  await productDiscovery.openLatestSelectedProduct()
})

Then('Product {string} is visible in catalog', async ({ pages }, productName: string) => {
  await pages.home.expectProductIsVisible(productName)
})

Then('the selected product is visible in catalog', async ({ pages, scenarioContext }) => {
  await pages.home.expectProductIsVisible(getLatestSelectedProduct(scenarioContext).name)
})

Then('Product {string} is not visible in catalog', async ({ pages }, productName: string) => {
  await pages.home.expectProductIsNotVisible(productName)
})

Then('No search results are displayed', async ({ pages }) => {
  await pages.home.expectNoSearchResults()
})

Then('Product details for {string} are displayed', async ({ pages }, productName: string) => {
  await pages.product.expectProductDetails(productName)
})

Then('selected product details are displayed', async ({ pages, scenarioContext }) => {
  await pages.product.expectProductDetails(getLatestSelectedProduct(scenarioContext).name)
})

Then('Product price is displayed', async ({ pages }) => {
  await pages.product.expectProductPriceIsDisplayed()
})

Then('Product add to cart control is available', async ({ pages }) => {
  await pages.product.expectAddToCartIsAvailable()
})

Then('at least {int} catalog product is visible', async ({ pages }, expectedCount: number) => {
  await pages.home.expectVisibleProductCountAtLeast(expectedCount)
})
