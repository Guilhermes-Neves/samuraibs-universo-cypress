/// <reference types="Cypress" />

import { el } from './elements'

import alertError from '../../components/alertError'
import toast from '../../components/toast'

class LoginPage {

  constructor() {
    this.alertError = alertError
    this.toast = toast
  }

  go() {
    cy.visit('/')
  }

  form(user) {
    cy.get(el.email)
      .clear()
      .type(user.email)

    cy.get(el.password)
      .clear()
      .type(user.password)
  }

  submit() {
    cy.contains(el.loginButton).click()
  }
}

export default new LoginPage()