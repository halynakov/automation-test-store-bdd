import { DataTable } from 'playwright-bdd'
import { When, Then } from './bdd'
import { getSelectedProducts } from '../support/scenarioContext'
import { GuestCustomer, guestCustomer } from '../support/testData'

const customerFields = [
  'firstName',
  'lastName',
  'email',
  'telephone',
  'address1',
  'city',
  'region',
  'postcode',
  'country'
] as const

function parseGuestCustomer(dataTable: DataTable): GuestCustomer {
  const customer = { ...guestCustomer }
  const rows = dataTable.hashes()

  for (const row of rows) {
    const field = row.field as (typeof customerFields)[number]

    if (!customerFields.includes(field)) {
      throw new Error(`Unsupported guest customer field: "${row.field}".`)
    }

    customer[field] = row.value
  }

  return customer
}

When('Proceed to checkout from cart', async ({ pages }) => {
  await pages.cart.proceedToCheckout()
})

When('Continue checkout as guest', async ({ pages }) => {
  await pages.checkout.continueAsGuest()
})

When('Submit checkout form without required fields', async ({ pages }) => {
  await pages.checkout.continueWithoutRequiredFields()
})

When('Continue checkout form', async ({ pages }) => {
  await pages.checkout.continueCheckoutForm()
})

When('Fill valid guest checkout details', async ({ pages, scenarioContext }) => {
  scenarioContext.guestCustomer = guestCustomer
  await pages.checkout.fillGuestDetails(scenarioContext.guestCustomer)
})

When('I fill guest checkout details:', async ({ pages, scenarioContext }, dataTable: DataTable) => {
  scenarioContext.guestCustomer = parseGuestCustomer(dataTable)
  await pages.checkout.fillGuestDetails(scenarioContext.guestCustomer)
})

When('Confirm order if confirmation step is available', async ({ pages }) => {
  await pages.checkout.confirmOrderIfAvailable()
})

Then('Checkout validation message is displayed', async ({ pages }) => {
  await pages.checkout.expectValidationIsShown()
})

Then('Checkout validation message contains {string}', async ({ pages }, message: string) => {
  await pages.checkout.expectValidationContains(message)
})

Then('Checkout page is displayed', async ({ pages }) => {
  await pages.checkout.expectCheckoutPage()
})

Then('Checkout account selection is displayed', async ({ pages }) => {
  await pages.checkout.expectCheckoutAccountSelection()
})

Then('Guest checkout details are filled', async ({ pages, scenarioContext }) => {
  await pages.checkout.expectGuestDetailsAreFilled(scenarioContext.guestCustomer)
})

Then('Checkout confirmation is displayed', async ({ pages }) => {
  await pages.checkout.expectCheckoutConfirmation()
})

Then('Checkout confirmation contains the selected product', async ({ pages, scenarioContext }) => {
  await pages.checkout.expectConfirmationContainsProduct(getSelectedProducts(scenarioContext)[0].name)
})

Then('Checkout confirmation contains the selected products', async ({ pages, scenarioContext }) => {
  for (const product of getSelectedProducts(scenarioContext)) {
    await pages.checkout.expectConfirmationContainsProduct(product.name)
  }
})

Then('Checkout confirmation totals are displayed', async ({ pages }) => {
  await pages.checkout.expectConfirmationTotalsAreDisplayed()
})

Then('Checkout confirmation address and payment are displayed', async ({ pages }) => {
  await pages.checkout.expectConfirmationAddressIsDisplayed()
})
