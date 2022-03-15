/// <reference types="Cypress" />

import signupPage from '../support/pages/signup/index.js'

describe('Cadastro', () => {

  context('quando o usuário é novato', () => {
    const user = {
      name: 'Guilherme Neves',
      email: 'neves@samuraibs.com',
      password: 'pwd123'
    }

    before(() => {
      cy.task('removeUser', user.email)
        .then(function (result) {
          console.log(result)
        })
    })

    it('deve cadastrar com sucesso', () => {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    })
  })

  context('quando o email já existe', () => {
    const user = {
      name: 'João Lucas',
      email: 'joao@samuraibs.com',
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

    it('não deve cadastrar o usuário', () => {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
    })
  })

  context('quando o email é incorreto', () => {
    const user = {
      name: 'Elizabeth Olsen',
      email: 'liza.yahoo.com',
      password: 'pwd123'
    }

    it('deve exibir mensagem de alerta', () => {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.alertError.shouldHaveText('Informe um email válido')
    })
  })

  context('quando a senha é muito curta', () => {

    const passwords = ['1', 'a2', 'ab3', 'abc4', 'ab$c5']

    beforeEach(() => {
      signupPage.go()
    })

    passwords.forEach(p => {
      it('não deve cadastrar com a senha: ' + p, () => {
        const user = { name: 'Elizabeth Olsen', email: 'liza@yahoo.com', password: p }

        signupPage.form(user)
        signupPage.submit()
      })
    })

    afterEach(() => {
      signupPage.alertError.shouldHaveText('Pelo menos 6 caracteres')
    })

  })

  context('deve exibir mensagem de obrigatoriedade', () => {
    const expectedMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ]

    before(() => {
      signupPage.go()
      signupPage.submit()
    })

    expectedMessages.forEach(m => {
      it('deve exibir: ' + m.toLocaleLowerCase(), () => {
        signupPage.alertError.shouldHaveText(m)
      })
    })
  })
})
