describe('Product Catalog', () => {
  beforeEach(() => {
    cy.visit('/catalogue')
  })

  it('should display product categories', () => {
    cy.get('[data-testid="catalog-section"]').within(() => {
      cy.contains('новинки').should('be.visible')
      cy.contains('весенние хиты').should('be.visible')
      cy.contains('свадебные').should('be.visible')
      cy.contains('экзотические').should('be.visible')
    })
  })

  it('should filter products by category', () => {
    cy.contains('свадебные').click()
    cy.url().should('include', '/catalogue/wedding')
    cy.get('[data-testid="product-card"]').should('exist')
  })

  it('should add product to cart', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="add-to-cart"]').click()
    })
    cy.get('[data-testid="cart-counter"]').should('have.text', '1')
  })

  it('should add product to favorites', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="add-to-favorites"]').click()
    })
    cy.get('[data-testid="favorites-counter"]').should('have.text', '1')
  })

  it('should show product details', () => {
    cy.get('[data-testid="product-card"]').first().click()
    cy.url().should('include', '/product/')
    cy.get('[data-testid="product-details"]').should('be.visible')
  })
}) 