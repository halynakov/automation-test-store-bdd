import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { GuestCheckoutFormComponent } from './components/GuestCheckoutFormComponent'
import { GuestCustomer } from '../support/testData'

export class CheckoutPage extends BasePage {
  readonly guestCheckoutRadio: Locator
  readonly continueButton: Locator
  readonly confirmButton: Locator
  readonly guestForm: GuestCheckoutFormComponent

  constructor(page: Page) {
    super(page)
    this.guestCheckoutRadio = page.locator('#accountFrm_accountguest')
    this.continueButton = page.locator('button[title="Continue"], button:has-text("Continue")').first()
    this.confirmButton = page
      .locator('#checkout_btn, button[title="Confirm Order"], button:has-text("Confirm Order")')
      .first()
    this.guestForm = new GuestCheckoutFormComponent(page)
  }

  async continueAsGuest() {
    await this.guestCheckoutRadio.check()
    await this.continueButton.click()
  }

  async continueWithoutRequiredFields() {
    await this.continueButton.click()
  }

  async expectValidationIsShown() {
    await this.guestForm.expectValidationIsShown()
  }

  async fillGuestDetails(customer?: GuestCustomer) {
    await this.guestForm.fillValidCustomerDetails(customer)
  }

  async expectGuestDetailsAreFilled(customer?: GuestCustomer) {
    await this.guestForm.expectCustomerDetailsAreFilled(customer)
  }

  async confirmOrderIfAvailable() {
    if (await this.confirmButton.isVisible().catch(() => false)) {
      await this.confirmButton.click()
    }
  }

  async expectCheckoutPage() {
    await expect(this.page).toHaveURL(/checkout/)
  }

  async expectCheckoutAccountSelection() {
    await expect(this.page).toHaveURL(/account\/login/)
    await expect(this.guestCheckoutRadio).toBeVisible()
  }
}
