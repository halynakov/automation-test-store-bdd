import { expect, Locator, Page } from '@playwright/test'
import { guestCustomer } from '../../support/testData'

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

  async fillValidCustomerDetails() {
    await this.firstNameInput.fill(guestCustomer.firstName)
    await this.lastNameInput.fill(guestCustomer.lastName)
    await this.emailInput.fill(guestCustomer.email)
    await this.telephoneInput.fill(guestCustomer.telephone)
    await this.addressInput.fill(guestCustomer.address1)
    await this.cityInput.fill(guestCustomer.city)
    await this.postcodeInput.fill(guestCustomer.postcode)
    await this.countrySelect.selectOption({ label: guestCustomer.country })
    await expect(this.regionSelect).toContainText(guestCustomer.region)
    await this.regionSelect.selectOption({ label: guestCustomer.region })
  }

  async expectCustomerDetailsAreFilled() {
    await expect(this.firstNameInput).toHaveValue(guestCustomer.firstName)
    await expect(this.lastNameInput).toHaveValue(guestCustomer.lastName)
    await expect(this.emailInput).toHaveValue(guestCustomer.email)
    await expect(this.cityInput).toHaveValue(guestCustomer.city)
  }
}
