/// <reference types="Cypress" />

import {el} from './elements'

class DashboardPage {
  shouldHaveText(expectedText) {
    cy.get(el.linkProfile)
        .should('be.visible')
        .find('strong')
        .should('have.text', expectedText)
  }
}

export default new DashboardPage()