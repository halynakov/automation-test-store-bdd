import { When, Then } from './bdd'

When('Proceed to checkout from cart', async ({ pages }) => {
  await pages.cart.proceedToCheckout()
})

When('Continue checkout as guest', async ({ pages }) => {
  await pages.checkout.continueAsGuest()
})

When('Submit checkout form without required fields', async ({ pages }) => {
  await pages.checkout.continueWithoutRequiredFields()
})

When('Fill valid guest checkout details', async ({ pages }) => {
  await pages.checkout.fillGuestDetails()
})

When('Confirm order if confirmation step is available', async ({ pages }) => {
  await pages.checkout.confirmOrderIfAvailable()
})

Then('Checkout validation message is displayed', async ({ pages }) => {
  await pages.checkout.expectValidationIsShown()
})

Then('Checkout page is displayed', async ({ pages }) => {
  await pages.checkout.expectCheckoutPage()
})

Then('Checkout account selection is displayed', async ({ pages }) => {
  await pages.checkout.expectCheckoutAccountSelection()
})

Then('Guest checkout details are filled', async ({ pages }) => {
  await pages.checkout.expectGuestDetailsAreFilled()
})
