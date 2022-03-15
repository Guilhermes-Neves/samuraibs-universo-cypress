import {el} from './elements'

class AlertError { 
  shouldHaveText(expectedText) {
    cy.contains(el.alert, expectedText)
        .should('be.visible')
  }
}

export default new AlertError()