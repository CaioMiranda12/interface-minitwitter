describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('faz login com sucesso e vai para o feed', () => {
    cy.get('input[name="email"]').type('alice@email.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/')
  })

  it('exibe erro com credenciais inválidas', () => {
    cy.get('input[name="email"]').type('errado@email.com')
    cy.get('input[name="password"]').type('senhaerrada')
    cy.get('button[type="submit"]').click()
    cy.contains('Erro ao fazer login.').should('be.visible')
  })

  it('redireciona para register ao clicar em cadastrar', () => {
    cy.contains('Cadastrar').click()
    cy.url().should('include', '/register')
  })
})