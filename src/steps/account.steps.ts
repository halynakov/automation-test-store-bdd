import { Given, When, Then } from './bdd'

Given('Open account login page', async ({ pages }) => {
  await pages.account.openLogin()
})

Given('Open create account page', async ({ pages }) => {
  await pages.account.openCreateAccount()
})

Given('Open forgotten password page', async ({ pages }) => {
  await pages.account.openForgottenPassword()
})

When('Continue as a new registered customer', async ({ pages }) => {
  await pages.account.continueToRegisterAccount()
})

When('Submit invalid account login credentials', async ({ pages }) => {
  await pages.account.submitInvalidLogin()
})

When('Submit empty registration form', async ({ pages }) => {
  await pages.account.submitEmptyRegistration()
})

When('Open forgotten password from login page', async ({ pages }) => {
  await pages.account.openForgottenPasswordFromLogin()
})

When('Submit forgotten password request for unknown account', async ({ pages }) => {
  await pages.account.submitUnknownForgottenPasswordRequest()
})

Then('Account login page is displayed', async ({ pages }) => {
  await pages.account.expectLoginPage()
})

Then('Invalid account login message is displayed', async ({ pages }) => {
  await pages.account.expectInvalidLoginMessage()
})

Then('Create account page is displayed', async ({ pages }) => {
  await pages.account.expectRegisterPage()
})

Then('Registration validation messages are displayed', async ({ pages }) => {
  await pages.account.expectRegistrationValidation()
})

Then('Forgotten password page is displayed', async ({ pages }) => {
  await pages.account.expectForgottenPasswordPage()
})

Then('Forgotten password error message is displayed', async ({ pages }) => {
  await pages.account.expectForgottenPasswordError()
})
