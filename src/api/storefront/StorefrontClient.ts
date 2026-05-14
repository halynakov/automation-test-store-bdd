import { APIRequestContext } from '@playwright/test'
import { CatalogProduct, getCatalogProduct } from '../../support/catalog'
import { storefrontRoutes } from '../../support/routes'
import { SelectedProduct } from '../../support/scenarioContext'

type AddToCartResponse = {
  item_count?: string | number
  total?: string
  cart_details?: string
}

export class StorefrontClient {
  constructor(private readonly request: APIRequestContext) {}

  async addProductToCart(productName: string): Promise<AddToCartResponse> {
    const product = getCatalogProduct(productName)

    return this.addCatalogProductToCart(product)
  }

  async addProductsToCart(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await this.addProductToCart(productName)
    }
  }

  async addSelectedProductToCart(product: SelectedProduct): Promise<void> {
    for (let index = 0; index < product.quantity; index += 1) {
      await this.addProductById(product.name, product.id)
    }
  }

  async addSelectedProductsToCart(products: SelectedProduct[]): Promise<void> {
    for (const product of products) {
      await this.addSelectedProductToCart(product)
    }
  }

  private async addCatalogProductToCart(product: CatalogProduct): Promise<AddToCartResponse> {
    return this.addProductById(product.name, product.id)
  }

  private async addProductById(productName: string, productId: number): Promise<AddToCartResponse> {
    const response = await this.request.get(storefrontRoutes.addToCart(), {
      params: {
        product_id: String(productId)
      }
    })

    if (!response.ok()) {
      throw new Error(`Failed to add "${productName}" to cart. HTTP status: ${response.status()}`)
    }

    const payload = (await response.json()) as AddToCartResponse

    if (payload.item_count === undefined) {
      throw new Error(`Add to cart response for "${productName}" does not include item_count.`)
    }

    return payload
  }
}
