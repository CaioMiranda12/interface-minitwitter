describe('Register', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('exibe erro de validação com senha curta', () => {
    cy.get('input[name="name"]').should('be.visible').type('João')
    cy.get('input[name="email"]').type('joao@email.com')
    cy.get('input[name="password"]').type('123')
    cy.get('button[type="submit"]').click()
    cy.contains('Senha deve ter pelo menos 4 caracteres', { timeout: 6000 }).should('be.visible')
  })
  it('redireciona para login ao clicar em entrar', () => {
    cy.contains('Login').click()
    cy.url().should('include', '/login')
  })
})