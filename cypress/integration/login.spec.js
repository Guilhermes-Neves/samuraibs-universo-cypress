/// <reference types="Cypress" />

import loginPage from '../support/pages/login/index.js'
import dashboardPage from '../support/pages/dashboard/index.js'

describe('Login', () => {
  context('quando o usuário existe no sistema', () => {
    const user = {
      name: 'Guilherme Neves',
      email: 'neves@samuraibs.com',
      password: 'pwd123',
      is_provider: true
    }

    before(() => {
      cy.task('removeUser', user.email)
        .then(function (result) {
          console.log(result)
        })

      cy.request(
        'POST',
        'http://localhost:3333/users',
        user
      ).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('deve logar com sucesso', () => {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()
      dashboardPage.shouldHaveText(user.name)
    })
  })

  context('quando a senha é senha incorreta', () => {
    const user = {
      email: 'senha@incorreta.com',
      password: 'xpto123'
    }

    it('deve exibir toast de login inválido', () => {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()
      loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
    })
  })

  context('quando o e-mail é inválido', () => {
    const user = {
      email: 'emailinvalido.com',
      password: 'pwd123'
    }

    it('deve exibir alerta de email inválido', () => {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()
      loginPage.alertError.shouldHaveText('Informe um email válido')
    })
  })

  context('deve exibir mensagem de obrigatoriedade', () => {
    const expectedMessages = [
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ]

    expectedMessages.forEach(m => {
      it('deve exibir mensagem' + m.toLocaleLowerCase(), () => {
        loginPage.go()
        loginPage.submit()
        loginPage.alertError.shouldHaveText(m)
      })
    })

  })
})