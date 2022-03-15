/// <reference types="Cypress" />

import {el} from './elements'

import alertError from '../../components/alertError'
import toast from '../../components/toast'

class LoginPage {
  
  constructor() {
    this.alertError = alertError
    this.toast = toast
  }

  go() {
    cy.visit('')
  }

  form(user) {
    cy.get(el.email).type(user.email)
    cy.get(el.password).type(user.password)
  }

  submit() {
    cy.contains(el.loginButton).click()
  }

  alertHaveText(expectedText) {
    cy.contains('.alert-error', expectedText)
        .should('be.visible')
  }
}

export default new LoginPage()