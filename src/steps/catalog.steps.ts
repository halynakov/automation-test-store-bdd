import { When, Then } from './bdd'

When('Search for product {string}', async ({ pages }, productName: string) => {
  await pages.home.searchFor(productName)
})

When('Open category {string}', async ({ pages }, categoryName: string) => {
  await pages.home.openCategory(categoryName)
})

When('Open product {string}', async ({ pages }, productName: string) => {
  await pages.product.openProduct(productName)
})

Then('Product {string} is visible in catalog', async ({ pages }, productName: string) => {
  await pages.home.expectProductIsVisible(productName)
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

Then('Product price is displayed', async ({ pages }) => {
  await pages.product.expectProductPriceIsDisplayed()
})

Then('Product add to cart control is available', async ({ pages }) => {
  await pages.product.expectAddToCartIsAvailable()
})
