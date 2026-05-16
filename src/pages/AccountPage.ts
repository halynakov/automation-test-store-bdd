import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { storefrontRoutes } from '../support/routes'

export class AccountPage extends BasePage {
  readonly accountLoginHeading: Locator
  readonly returningCustomerPanel: Locator
  readonly registerAccountRadio: Locator
  readonly newCustomerContinueButton: Locator
  readonly loginNameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly alertMessage: Locator
  readonly registerForm: Locator
  readonly registerContinueButton: Locator
  readonly forgottenPasswordLink: Locator
  readonly forgottenPasswordHeading: Locator
  readonly forgottenLoginNameInput: Locator
  readonly forgottenEmailInput: Locator
  readonly forgottenContinueButton: Locator

  constructor(page: Page) {
    super(page)
    this.accountLoginHeading = page
      .locator('h1, .maintext')
      .filter({ hasText: /account login/i })
      .first()
    this.returningCustomerPanel = page.locator('.returncustomer').first()
    this.registerAccountRadio = page.locator('#accountFrm_accountregister')
    this.newCustomerContinueButton = page.locator('#accountFrm button[title="Continue"]').first()
    this.loginNameInput = page.locator('#loginFrm_loginname')
    this.passwordInput = page.locator('#loginFrm_password')
    this.loginButton = page.locator('#loginFrm button[title="Login"]').first()
    this.alertMessage = page.locator('.alert-error, .alert-danger, .alert').first()
    this.registerForm = page.locator('#AccountFrm').first()
    this.registerContinueButton = page.locator('#AccountFrm button[title="Continue"]').first()
    this.forgottenPasswordLink = page.locator('a[href*="forgotten/password"]').first()
    this.forgottenPasswordHeading = page
      .locator('h1, .maintext')
      .filter({ hasText: /forgot your password/i })
      .first()
    this.forgottenLoginNameInput = page.locator('#forgottenFrm_loginname')
    this.forgottenEmailInput = page.locator('#forgottenFrm_email')
    this.forgottenContinueButton = page.locator('#forgottenFrm button[title="Continue"]').first()
  }

  async openLogin() {
    await this.page.goto(storefrontRoutes.accountLogin())
  }

  async openCreateAccount() {
    await this.page.goto(storefrontRoutes.accountCreate())
  }

  async openForgottenPassword() {
    await this.page.goto(storefrontRoutes.forgottenPassword())
  }

  async continueToRegisterAccount() {
    await this.registerAccountRadio.check()
    await this.newCustomerContinueButton.click()
  }

  async submitInvalidLogin() {
    await this.loginNameInput.fill('missing.user')
    await this.passwordInput.fill('wrong-password')
    await this.loginButton.click()
  }

  async submitEmptyRegistration() {
    await this.registerContinueButton.click()
  }

  async openForgottenPasswordFromLogin() {
    await this.forgottenPasswordLink.click()
  }

  async submitUnknownForgottenPasswordRequest() {
    await this.forgottenLoginNameInput.fill('unknown.user')
    await this.forgottenEmailInput.fill('unknown.user@example.com')
    await this.forgottenContinueButton.click()
  }

  async expectLoginPage() {
    await expect(this.accountLoginHeading).toBeVisible()
    await expect(this.returningCustomerPanel).toBeVisible()
  }

  async expectInvalidLoginMessage() {
    await expect(this.alertMessage).toContainText(/incorrect login or password/i)
  }

  async expectRegisterPage() {
    await expect(this.registerForm).toBeVisible()
  }

  async expectRegistrationValidation() {
    await expect(this.registerForm).toContainText(/First Name must be between/i)
    await expect(this.registerForm).toContainText(/Email Address does not appear to be valid/i)
  }

  async expectForgottenPasswordPage() {
    await expect(this.forgottenPasswordHeading).toBeVisible()
    await expect(this.forgottenLoginNameInput).toBeVisible()
  }

  async expectForgottenPasswordError() {
    await expect(this.alertMessage).toContainText(/No records found/i)
  }
}
