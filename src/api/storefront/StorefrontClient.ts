import { APIRequestContext } from '@playwright/test'
import { CatalogProduct, getCatalogProduct } from '../../support/catalog'
import { storefrontRoutes } from '../../support/routes'

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

  private async addCatalogProductToCart(product: CatalogProduct): Promise<AddToCartResponse> {
    const response = await this.request.get(storefrontRoutes.addToCart(), {
      params: {
        product_id: String(product.id)
      }
    })

    if (!response.ok()) {
      throw new Error(`Failed to add "${product.name}" to cart. HTTP status: ${response.status()}`)
    }

    const payload = (await response.json()) as AddToCartResponse

    if (payload.item_count === undefined) {
      throw new Error(`Add to cart response for "${product.name}" does not include item_count.`)
    }

    return payload
  }
}
