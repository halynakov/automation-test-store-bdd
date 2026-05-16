import { expect, Locator, Page } from '@playwright/test'
import { GuestCustomer, guestCustomer } from '../../support/testData'

export class GuestCheckoutFormComponent {
  readonly validationMessages: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly emailInput: Locator
  readonly telephoneInput: Locator
  readonly addressInput: Locator
  readonly cityInput: Locator
  readonly postcodeInput: Locator
  readonly countrySelect: Locator
  readonly regionSelect: Locator

  constructor(page: Page) {
    this.validationMessages = page.locator('.alert-error, .has-error, .text-danger, .help-block')
    this.firstNameInput = page.locator('#guestFrm_firstname')
    this.lastNameInput = page.locator('#guestFrm_lastname')
    this.emailInput = page.locator('#guestFrm_email')
    this.telephoneInput = page.locator('#guestFrm_telephone')
    this.addressInput = page.locator('#guestFrm_address_1')
    this.cityInput = page.locator('#guestFrm_city')
    this.postcodeInput = page.locator('#guestFrm_postcode')
    this.countrySelect = page.locator('#guestFrm_country_id')
    this.regionSelect = page.locator('#guestFrm_zone_id')
  }

  async expectValidationIsShown() {
    await expect(this.validationMessages.first()).toBeVisible()
  }

  async expectValidationContains(message: string | RegExp) {
    await expect(this.validationMessages.filter({ hasText: message }).first()).toBeVisible()
  }

  async fillValidCustomerDetails(customer: GuestCustomer = guestCustomer) {
    await this.firstNameInput.fill(customer.firstName)
    await this.lastNameInput.fill(customer.lastName)
    await this.emailInput.fill(customer.email)
    await this.telephoneInput.fill(customer.telephone)
    await this.addressInput.fill(customer.address1)
    await this.cityInput.fill(customer.city)
    await this.postcodeInput.fill(customer.postcode)
    await this.countrySelect.selectOption({ label: customer.country })
    await expect(this.regionSelect).toContainText(customer.region)
    await this.regionSelect.selectOption({ label: customer.region })
  }

  async expectCustomerDetailsAreFilled(customer: GuestCustomer = guestCustomer) {
    await expect(this.firstNameInput).toHaveValue(customer.firstName)
    await expect(this.lastNameInput).toHaveValue(customer.lastName)
    await expect(this.emailInput).toHaveValue(customer.email)
    await expect(this.cityInput).toHaveValue(customer.city)
  }
}
