import { createBdd } from 'playwright-bdd'
import { test } from '../fixtures/test'

export const { Given, When, Then, Before, After, BeforeStep, AfterStep } = createBdd(test)
