describe('Shopping Cart Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should complete full shopping flow', () => {
    // Добавляем товар в корзину
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="add-to-cart"]').click()
    })

    // Открываем корзину
    cy.get('[data-testid="cart-button"]').click()
    cy.get('[data-testid="cart-modal"]').should('be.visible')

    // Проверяем товар в корзине
    cy.get('[data-testid="cart-item"]').should('have.length', 1)

    // Изменяем количество
    cy.get('[data-testid="quantity-increase"]').click()
    cy.get('[data-testid="item-quantity"]').should('have.text', '2')

    // Проверяем обновление суммы
    cy.get('[data-testid="cart-total"]').should('not.have.text', '0')

    // Переходим к оформлению
    cy.get('[data-testid="checkout-button"]').click()
    cy.url().should('include', '/checkout')
  })

  it('should handle empty cart', () => {
    cy.get('[data-testid="cart-button"]').click()
    cy.get('[data-testid="empty-cart-message"]').should('be.visible')
    cy.get('[data-testid="continue-shopping"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should remove items from cart', () => {
    // Добавляем товар
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="add-to-cart"]').click()
    })

    // Открываем корзину
    cy.get('[data-testid="cart-button"]').click()

    // Удаляем товар
    cy.get('[data-testid="remove-item"]').click()
    cy.get('[data-testid="empty-cart-message"]').should('be.visible')
  })
}) 