describe('Interações com posts', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/posts**').as('getPosts')
    cy.visit('/login')
    cy.get('input[name="email"]').type('alice@email.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/')
    cy.wait('@getPosts')
  })

  it('debug posts', () => {
    cy.get('body').then(($body) => {
      cy.log('tem post-card? ' + $body.find('[data-testid="post-card"]').length)
    })
  })

  it('usuário não logado tenta postar e vê modal de login', () => {
    cy.clearLocalStorage()
    cy.visit('/')
    cy.get('[data-testid="post-form"]').within(() => {
      cy.get('textarea').click()
    })
    cy.get('button').contains('Postar').click()

    cy.contains('Faça login para continuar').should('be.visible')
  })

  it('usuário não logado tenta dar like e vê modal', () => {
    cy.clearLocalStorage()
    cy.visit('/')
    cy.get('[data-testid="like-button"]').first().click()
    cy.contains('Faça login para continuar').should('be.visible')
  })
})