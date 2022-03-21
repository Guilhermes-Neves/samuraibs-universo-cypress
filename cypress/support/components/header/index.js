import {el} from './elements'

class Header { 
  userLoggedIn(expectedText) {
    cy.get(el.fullName, {timeout: 7000})
        .should('be.visible')
        .should('have.text', expectedText)
  }
}

export default new Header()