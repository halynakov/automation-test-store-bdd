import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { GuestCheckoutFormComponent } from './components/GuestCheckoutFormComponent'
import { GuestCustomer } from '../support/testData'

export class CheckoutPage extends BasePage {
  readonly guestCheckoutRadio: Locator
  readonly continueButton: Locator
  readonly confirmButton: Locator
  readonly confirmationHeading: Locator
  readonly confirmationProducts: Locator
  readonly confirmationTotals: Locator
  readonly shippingSection: Locator
  readonly paymentSection: Locator
  readonly guestForm: GuestCheckoutFormComponent

  constructor(page: Page) {
    super(page)
    this.guestCheckoutRadio = page.locator('#accountFrm_accountguest')
    this.continueButton = page.locator('button[title="Continue"], button:has-text("Continue")').first()
    this.confirmButton = page
      .locator('#checkout_btn, button[title="Confirm Order"], button:has-text("Confirm Order")')
      .first()
    this.confirmationHeading = page
      .locator('h1, .maintext')
      .filter({ hasText: /checkout confirmation/i })
      .first()
    this.confirmationProducts = page.locator('.confirm_products').first()
    this.confirmationTotals = page.locator('.confirm_total').first()
    this.shippingSection = page.locator('.confirm_shippment_options').first()
    this.paymentSection = page.locator('.confirm_payment_options').first()
    this.guestForm = new GuestCheckoutFormComponent(page)
  }

  async continueAsGuest() {
    await this.guestCheckoutRadio.check()
    await this.continueButton.click()
  }

  async continueWithoutRequiredFields() {
    await this.continueButton.click()
  }

  async continueCheckoutForm() {
    await this.continueButton.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async expectValidationIsShown() {
    await this.guestForm.expectValidationIsShown()
  }

  async expectValidationContains(message: string | RegExp) {
    await this.guestForm.expectValidationContains(message)
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

  async expectCheckoutConfirmation() {
    await expect(this.page).toHaveURL(/checkout\/guest_step_3/)
    await expect(this.confirmationHeading).toBeVisible()
  }

  async expectConfirmationContainsProduct(productName: string) {
    await expect(this.confirmationProducts).toContainText(productName)
  }

  async expectConfirmationTotalsAreDisplayed() {
    await this.expectCheckoutConfirmation()
    await expect(this.confirmationTotals).toContainText(/Sub-Total:/)
    await expect(this.confirmationTotals).toContainText(/Flat Shipping Rate:/)
    await expect(this.confirmationTotals).toContainText(/Total:/)
  }

  async expectConfirmationAddressIsDisplayed() {
    await this.expectCheckoutConfirmation()
    await expect(this.shippingSection).toContainText(/Flat Shipping Rate/)
    await expect(this.paymentSection).toContainText(/Cash On Delivery/)
  }
}
