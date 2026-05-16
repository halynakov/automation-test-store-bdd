import { Given, When, Then } from './bdd'

Given('I am on a category page {string}', async ({ pages }, categoryName: string) => {
  await pages.home.openCategory(categoryName)
})

When('I open home through header navigation', async ({ pages }) => {
  await pages.home.openViaHeaderLogo()
})

When('I open account through header navigation', async ({ pages }) => {
  await pages.home.openAccountViaHeader()
})

Then('Home page is displayed', async ({ pages }) => {
  await pages.home.expectHomePageIsDisplayed()
})

Then('Header navigation is displayed', async ({ pages }) => {
  await pages.home.expectHeaderNavigationIsDisplayed()
})
