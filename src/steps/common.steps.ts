import { Given, Then } from './bdd'

Given('Open Automation Test Store home page', async ({ pages }) => {
  await pages.home.open()
})

Then('The page title contains {string}', async ({ pages }, expectedTitle: string) => {
  await pages.home.expectPageTitle(new RegExp(expectedTitle, 'i'))
})
