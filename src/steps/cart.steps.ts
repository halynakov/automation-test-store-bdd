import { DataTable } from 'playwright-bdd'
import { Given, When, Then } from './bdd'

Given('the shopping cart contains product {string}', async ({ storefrontClient }, productName: string) => {
  await storefrontClient.addProductToCart(productName)
})

Given('the shopping cart contains products:', async ({ storefrontClient }, dataTable: DataTable) => {
  const productNames = dataTable.raw().flat()

  await storefrontClient.addProductsToCart(productNames)
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

Then('Cart header item count is {int}', async ({ pages }, count: number) => {
  await pages.home.expectCartItemCount(count)
})

Then('First cart item quantity is {int}', async ({ pages }, quantity: number) => {
  await pages.cart.expectFirstItemQuantity(quantity)
})

Then('Shopping cart is empty', async ({ pages }) => {
  await pages.cart.expectCartIsEmpty()
})
