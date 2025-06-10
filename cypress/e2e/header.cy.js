describe('Header Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to home page when clicking logo', () => {
    cy.get('[data-testid="logo"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should navigate to catalog page', () => {
    cy.contains('Каталог').click()
    cy.url().should('include', '/catalogue')
  })

  it('should open cart modal', () => {
    cy.get('[data-testid="cart-button"]').click()
    cy.get('[data-testid="cart-modal"]').should('be.visible')
  })

  it('should open favorites', () => {
    cy.get('[data-testid="favorites-button"]').click()
    cy.url().should('include', '/favorites')
  })
}) 