export const products = {
  canary: 'Skinsheen Bronzer Stick'
}

export type GuestCustomer = {
  firstName: string
  lastName: string
  email: string
  telephone: string
  address1: string
  city: string
  region: string
  postcode: string
  country: string
}

export const guestCustomer: GuestCustomer = {
  firstName: 'Test',
  lastName: 'Customer',
  email: `test.customer.${Date.now()}@example.com`,
  telephone: '1234567890',
  address1: '10 Test Street',
  city: 'Test City',
  region: 'Angus',
  postcode: '10001',
  country: 'United Kingdom'
}
