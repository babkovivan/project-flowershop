describe('About Us Section', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display about section content', () => {
    cy.get('[data-testid="about-section"]').within(() => {
      // Проверяем наличие заголовка
      cy.get('h2').should('be.visible')
      
      // Проверяем наличие изображений
      cy.get('img').should('have.length.at.least', 1)
      
      // Проверяем наличие текста
      cy.contains('О нас').should('be.visible')
    })
  })

  it('should have correct layout on different viewports', () => {
    // Мобильный вид
    cy.viewport('iphone-6')
    cy.get('[data-testid="about-section"]').should('be.visible')
    
    // Планшет
    cy.viewport('ipad-2')
    cy.get('[data-testid="about-section"]').should('be.visible')
    
    // Десктоп
    cy.viewport('macbook-15')
    cy.get('[data-testid="about-section"]').should('be.visible')
  })

  it('should load images correctly', () => {
    cy.get('[data-testid="about-section"]').within(() => {
      cy.get('img').each(($img) => {
        // Проверяем, что изображение загрузилось
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
    })
  })
}) 