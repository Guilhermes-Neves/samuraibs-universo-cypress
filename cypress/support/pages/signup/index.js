/// <reference types="Cypress" />

import {el} from './elements'

import toast from '../../components/toast'
import alertError from '../../components/alertError'

class SignupPage {

  constructor() {
    this.toast = toast
    this.alertError = alertError
  }

  go() {
    cy.visit('/signup')
  }

  form(user) {
    cy.get(el.name).type(user.name)
    cy.get(el.email).type(user.email)
    cy.get(el.password).type(user.password)
  }

  submit() {
    cy.contains(el.signupButton).click()
  }
}

export default new SignupPage()