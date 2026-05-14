import { DataTable } from 'playwright-bdd'
import { When, Then } from './bdd'
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

Then('Checkout page is displayed', async ({ pages }) => {
  await pages.checkout.expectCheckoutPage()
})

Then('Checkout account selection is displayed', async ({ pages }) => {
  await pages.checkout.expectCheckoutAccountSelection()
})

Then('Guest checkout details are filled', async ({ pages, scenarioContext }) => {
  await pages.checkout.expectGuestDetailsAreFilled(scenarioContext.guestCustomer)
})
