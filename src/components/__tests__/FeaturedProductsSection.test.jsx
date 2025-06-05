import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FeaturedProductsSection from '../FeaturedProductsSection'

// Мокаем ProductCard компонент
vi.mock('../ProductCard', () => ({
  default: ({ product }) => (
    <div data-testid="product-card">
      {product.title} - {product.price}
    </div>
  )
}))

describe('FeaturedProductsSection', () => {
  const mockProducts = [
    {
      id: 1,
      title: "Сердце весны",
      price: "3000₽",
      image: "/images/popular1.jpg",
      description: "Воплощение свежести и радости весенних дней"
    },
    {
      id: 2,
      title: "Нежность облаков",
      price: "3500₽",
      image: "/images/popular2.jpg",
      description: "Воздушный букет – словно кусочек неба в подарок"
    },
    {
      id: 3,
      title: "Мелодия счастья",
      price: "2500₽",
      image: "/images/popular3.jpg",
      description: "Яркий и жизнерадостный аккорд для любого повода"
    }
  ]

  it('renders only first two products', () => {
    render(<FeaturedProductsSection products={mockProducts} />)
    const productCards = screen.getAllByTestId('product-card')
    expect(productCards).toHaveLength(2)
    expect(productCards[0].textContent).toContain('Сердце весны')
    expect(productCards[1].textContent).toContain('Нежность облаков')
  })

  it('renders return to home button', () => {
    render(<FeaturedProductsSection products={mockProducts} />)
    const button = screen.getByText('вернуться на главную страницу')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-white', 'bg-opacity-70', 'px-8', 'py-2', 'rounded', 'text-gray-700')
  })

  it('navigates to home page when clicking return button', () => {
    // Мокаем window.location
    const { location } = window
    delete window.location
    window.location = { href: '' }
    
    render(<FeaturedProductsSection products={mockProducts} />)
    const button = screen.getByText('вернуться на главную страницу')
    
    fireEvent.click(button)
    expect(window.location.href).toBe('/')
    
    // Восстанавливаем window.location
    window.location = location
  })

  it('has correct section styling', () => {
    render(<FeaturedProductsSection products={mockProducts} />)
    const section = screen.getByRole('region', { name: /featured products/i })
    expect(section).toHaveClass(
      'mx-auto',
      'max-w-4xl',
      'bg-[#7A7A7A]',
      'pr-9',
      'pl-9',
      'pt-5',
      'pb-3',
      'mt-9',
      'rounded-lg',
      'shadow-md'
    )
  })
}) 