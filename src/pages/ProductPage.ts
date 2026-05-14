import { Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { ProductListComponent } from './components/ProductListComponent'

export class ProductPage extends BasePage {
  readonly productList: ProductListComponent

  constructor(page: Page) {
    super(page)
    this.productList = new ProductListComponent(page)
  }

  async openProduct(productName: string) {
    await this.productList.openProduct(productName)
  }

  async expectProductDetails(productName: string) {
    await this.productList.expectProductDetails(productName)
  }

  async expectProductPriceIsDisplayed() {
    await this.productList.expectProductPriceIsDisplayed()
  }

  async expectAddToCartIsAvailable() {
    await this.productList.expectAddToCartIsAvailable()
  }

  async addFirstProductToCart() {
    await this.addCurrentProductToCart()
  }

  async addCurrentProductToCart() {
    await this.clickFirstVisible(this.productList.productDetailsAddToCartButton, this.productList.addToCartButtons)
  }

  async addProductToCart(productName: string) {
    await this.productList.addProductToCart(productName)
  }
}
