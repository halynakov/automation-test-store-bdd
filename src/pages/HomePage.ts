import { Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { CategoryMenuComponent } from './components/CategoryMenuComponent'
import { HeaderComponent } from './components/HeaderComponent'
import { ProductListComponent } from './components/ProductListComponent'
import { storefrontRoutes } from '../support/routes'

export class HomePage extends BasePage {
  readonly header: HeaderComponent
  readonly categoryMenu: CategoryMenuComponent
  readonly productList: ProductListComponent

  constructor(page: Page) {
    super(page)
    this.header = new HeaderComponent(page)
    this.categoryMenu = new CategoryMenuComponent(page)
    this.productList = new ProductListComponent(page)
  }

  async open() {
    await this.page.goto(storefrontRoutes.home())
    await this.header.expectLogoVisible()
  }

  async searchFor(productName: string) {
    const submittedThroughHeader = await this.header.submitSearch(productName)

    if (!submittedThroughHeader) {
      await this.page.goto(storefrontRoutes.search(productName))
      return
    }
  }

  async openCategory(categoryName: string) {
    const openedThroughMenu = await this.categoryMenu.openCategory(categoryName)

    if (!openedThroughMenu) {
      await this.page.goto(storefrontRoutes.category(categoryName))
      return
    }

    await this.page.waitForLoadState('domcontentloaded')
  }

  async openCart() {
    const openedThroughHeader = await this.header.openCart()

    if (!openedThroughHeader) {
      await this.page.goto(storefrontRoutes.cart())
      return
    }
  }

  async expectCartItemCount(count: number) {
    await this.header.expectCartItemCount(count)
  }

  async expectProductIsVisible(productName: string) {
    await this.productList.expectProductIsVisible(productName)
  }

  async expectProductIsNotVisible(productName: string) {
    await this.productList.expectProductIsNotVisible(productName)
  }

  async expectNoSearchResults() {
    await this.productList.expectNoSearchResults()
  }
}
