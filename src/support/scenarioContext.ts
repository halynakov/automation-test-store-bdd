import { GuestCustomer } from './testData'

export type SelectedProduct = {
  name: string
  category: string
  id: number
  price?: string
  quantity: number
}

export type ScenarioContext = {
  id: string
  startedAt: string
  selectedProducts: SelectedProduct[]
  guestCustomer?: GuestCustomer
}

export function setSelectedProducts(context: ScenarioContext, products: SelectedProduct[]) {
  context.selectedProducts = [...products]
}

export function addSelectedProduct(context: ScenarioContext, product: SelectedProduct) {
  context.selectedProducts = [...context.selectedProducts, product]
}

export function getLatestSelectedProduct(context: ScenarioContext): SelectedProduct {
  const product = context.selectedProducts.at(-1)

  if (!product) {
    throw new Error('No selected product is available in the scenario context.')
  }

  return product
}

export function getSelectedProducts(context: ScenarioContext): SelectedProduct[] {
  if (context.selectedProducts.length === 0) {
    throw new Error('No selected products are available in the scenario context.')
  }

  return context.selectedProducts
}

export function getSelectedProductsQuantity(context: ScenarioContext): number {
  return getSelectedProducts(context).reduce((total, product) => total + product.quantity, 0)
}
