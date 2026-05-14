import { DataTable } from 'playwright-bdd'
import { Given, When, Then } from './bdd'
import { getLatestSelectedProduct, getSelectedProducts, getSelectedProductsQuantity } from '../support/scenarioContext'

Given('the shopping cart contains product {string}', async ({ storefrontClient }, productName: string) => {
  await storefrontClient.addProductToCart(productName)
})

Given('the shopping cart contains products:', async ({ storefrontClient }, dataTable: DataTable) => {
  const productNames = dataTable.raw().flat()

  await storefrontClient.addProductsToCart(productNames)
})

Given(
  'the shopping cart contains an available product from category {string}',
  async ({ productDiscovery }, categoryName: string) => {
    await productDiscovery.prepareCartWithAvailableProductFromCategory(categoryName)
  }
)

Given('the shopping cart contains available products:', async ({ productDiscovery }, dataTable: DataTable) => {
  await productDiscovery.prepareCartWithAvailableProducts(dataTable)
})

Given('I open the shopping cart', async ({ pages }) => {
  await pages.home.openCart()
})

When('Add the first listed product to cart', async ({ pages }) => {
  await pages.product.addFirstProductToCart()
})

When('Add the current product to cart', async ({ pages }) => {
  await pages.product.addCurrentProductToCart()
})

When('I add the selected product to cart', async ({ productDiscovery }) => {
  await productDiscovery.addLatestSelectedProductToCartViaUi()
})

When('Open shopping cart', async ({ pages }) => {
  await pages.home.openCart()
})

When('Set first cart item quantity to {int}', async ({ pages }, quantity: number) => {
  await pages.cart.setFirstItemQuantity(quantity)
})

When('Remove the first item from cart', async ({ pages }) => {
  await pages.cart.removeFirstItem()
})

Then('Cart contains product {string}', async ({ pages }, productName: string) => {
  await pages.cart.expectCartContains(productName)
})

Then('the cart contains the selected product', async ({ pages, scenarioContext }) => {
  await pages.cart.expectCartContains(getLatestSelectedProduct(scenarioContext).name)
})

Then('the cart contains the selected products', async ({ pages, scenarioContext }) => {
  await pages.cart.expectCartContainsSelectedProducts(getSelectedProducts(scenarioContext))
})

Then('Cart header item count is {int}', async ({ pages }, count: number) => {
  await pages.home.expectCartItemCount(count)
})

Then('Cart header item count matches selected products', async ({ pages, scenarioContext }) => {
  await pages.home.expectCartItemCount(getSelectedProductsQuantity(scenarioContext))
})

Then('First cart item quantity is {int}', async ({ pages }, quantity: number) => {
  await pages.cart.expectFirstItemQuantity(quantity)
})

Then('Shopping cart is empty', async ({ pages }) => {
  await pages.cart.expectCartIsEmpty()
})
