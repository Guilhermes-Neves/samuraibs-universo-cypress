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
      cy.postUser(user)
    })

    it('deve logar com sucesso', () => {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()
      dashboardPage.header.userLoggedIn(user.name)
    })
  })

  context('quando a senha é senha incorreta', () => {
    let user = {
      name: 'Senha Incorreta',
      email: 'senha@incorreta.com',
      password: 'xpto123',
      is_provider: true
    }

    before(() => {
      cy.postUser(user).then(() => {
        user.password = 'pwd123'
      })
    })

    it('deve exibir toast de login inválido', () => {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
      loginPage.toast.shouldHaveText(message)
    })
  })

  context('quando o e-mail é inválido', () => {
    const emails = [
      'neves.com.br',
      'yahoo.com',
      '@gmail.com',
      '@',
      'papito@',
      '111',
      '&*ˆ&ˆ&*',
      'xpto123'
    ]

    before(() => {
      loginPage.go()
    })

    emails.forEach((e) => {
      it('não deve logar com o email: ' + e, () => {
        const user = {email: e, password: 'pwd123'}
                
        loginPage.form(user)
        loginPage.submit()
        loginPage.alertError.shouldHaveText('Informe um email válido')
      })
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