/// <reference types="Cypress" />

import fpPage from '../support/pages/forgotpass/index'
import rpPage from '../support/pages/resetPass/index'
import loginPage from '../support/pages/login/index'

describe('resgate de senha', function () {
  before(function () {
    cy.fixture('recovery').then(function (recovery) {
      this.data = recovery
    })
  })

  context('quando o usuário esquece a senha', function () {
    before(function () {
      cy.postUser(this.data)
    })

    it('deve poder resgatar por email', function () {
      fpPage.go()
      fpPage.form(this.data.email)
      fpPage.submit()

      const expectedText = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
      fpPage.toast.shouldHaveText(expectedText)
    })

  })

  context('quando o usuário solicita o resgaste', function () {

    before(function () {
      cy.postUser(this.data)
      cy.recoveryPass(this.data.email)
    })

    it('deve poder castrar uma nova senha', function () {
      rpPage.go(Cypress.env('recoveryToken'))
      rpPage.form('abc123', 'abc123')
      rpPage.submit()

      const expectedText = 'Agora você já pode logar com a sua nova senha secreta.'
      loginPage.toast.shouldHaveText(expectedText)
    })

  })

})