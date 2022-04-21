/// <reference types="Cypress" />

import { el } from './elements'

class ResetPassPage {
  go(token) {
    cy.visit(`/reset-password?token=${token}`)
  }

  form(newPass, confirmPass) {
    cy.get(el.newPass)
      .clear()
      .type(newPass)

    cy.get(el.confirmPass)
      .clear()
      .type(confirmPass)
  }

  submit() {
    cy.contains(el.buttonChangePass).click()
  }
}

export default new ResetPassPage()