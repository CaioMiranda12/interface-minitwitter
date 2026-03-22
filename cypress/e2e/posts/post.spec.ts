describe('Feed', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/posts**').as('getPosts')
    cy.visit('/')
    cy.wait('@getPosts')
  })

  it('carrega e exibe posts', () => {
    cy.get('[data-testid="post-card"]').should('have.length.greaterThan', 0)
  })

  it('busca dispara requisição com o termo correto', () => {
    cy.intercept('GET', '**/posts?search=react**').as('searchPosts')

    cy.get('input[placeholder="Buscar por post..."]').last().type('react')
    cy.get('input[placeholder="Buscar por post..."]').last().type('{enter}')

    cy.wait('@searchPosts').its('request.url').should('include', 'search=react')
  })
})