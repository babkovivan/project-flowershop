describe('Shopping Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display popular products', () => {
    cy.get('[data-testid="popular-section"]').should('be.visible')
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1)
  })

  it('should allow viewing product details', () => {
    cy.get('[data-testid="product-card"]').first().click()
    cy.url().should('include', '/product/')
    cy.get('[data-testid="product-title"]').should('be.visible')
    cy.get('[data-testid="product-price"]').should('be.visible')
  })

  it('should allow adding products to cart', () => {
    cy.get('[data-testid="product-card"]').first()
      .find('[data-testid="add-to-cart"]')
      .click()
    cy.get('[data-testid="cart-count"]').should('have.text', '1')
  })
}) 