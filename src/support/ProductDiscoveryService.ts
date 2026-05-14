import { DataTable } from 'playwright-bdd'
import { StorefrontClient } from '../api/storefront/StorefrontClient'
import type { AppPages } from '../fixtures/test'
import {
  addSelectedProduct,
  getLatestSelectedProduct,
  ScenarioContext,
  SelectedProduct,
  setSelectedProducts
} from './scenarioContext'

type ProductSelectionRequest = {
  category: string
  quantity: number
}

export class ProductDiscoveryService {
  constructor(
    private readonly pages: AppPages,
    private readonly scenarioContext: ScenarioContext,
    private readonly storefrontClient: StorefrontClient
  ) {}

  async selectAvailableProductFromCategory(categoryName: string, quantity = 1): Promise<SelectedProduct> {
    await this.pages.home.openCategory(categoryName)

    const product = await this.pages.home.selectFirstAvailableProduct(categoryName, quantity)
    addSelectedProduct(this.scenarioContext, product)

    return product
  }

  async selectAvailableProductsFromCategories(requests: ProductSelectionRequest[]): Promise<SelectedProduct[]> {
    const products: SelectedProduct[] = []

    for (const request of requests) {
      await this.pages.home.openCategory(request.category)
      products.push(await this.pages.home.selectFirstAvailableProduct(request.category, request.quantity))
    }

    setSelectedProducts(this.scenarioContext, products)

    return products
  }

  async prepareCartWithAvailableProductFromCategory(categoryName: string, quantity = 1): Promise<SelectedProduct> {
    const product = await this.selectAvailableProductFromCategory(categoryName, quantity)
    await this.storefrontClient.addSelectedProductToCart(product)

    return product
  }

  async prepareCartWithAvailableProducts(dataTable: DataTable): Promise<SelectedProduct[]> {
    const products = await this.selectAvailableProductsFromCategories(this.parseProductSelectionRequests(dataTable))
    await this.storefrontClient.addSelectedProductsToCart(products)

    return products
  }

  async searchForLatestSelectedProductByName() {
    await this.pages.home.searchFor(getLatestSelectedProduct(this.scenarioContext).name)
  }

  async openLatestSelectedProduct() {
    const product = getLatestSelectedProduct(this.scenarioContext)

    await this.pages.home.searchFor(product.name)
    await this.pages.product.openProduct(product.name)
  }

  async addLatestSelectedProductToCartViaUi() {
    const product = getLatestSelectedProduct(this.scenarioContext)

    await this.pages.home.searchFor(product.name)
    await this.pages.product.addProductToCart(product.name)
  }

  private parseProductSelectionRequests(dataTable: DataTable): ProductSelectionRequest[] {
    return dataTable.hashes().map((row) => {
      const quantity = Number(row.quantity ?? 1)

      if (!row.category) {
        throw new Error('Product selection table must include a category column.')
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(`Quantity for category "${row.category}" must be a positive integer.`)
      }

      return {
        category: row.category,
        quantity
      }
    })
  }
}
