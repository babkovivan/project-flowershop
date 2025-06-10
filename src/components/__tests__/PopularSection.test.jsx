import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PopularSection from '../PopularSection'

// Мокаем изображения, так как они могут не существовать в тестовом окружении
vi.mock('/images/popular1.jpg', () => 'mocked-image-1')
vi.mock('/images/popular2.jpg', () => 'mocked-image-2')
vi.mock('/images/popular3.jpg', () => 'mocked-image-3')
vi.mock('/images/popular4.jpg', () => 'mocked-image-4')

describe('PopularSection Component', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Розы красные',
      price: 1500,
      image: '/images/roses.jpg',
      description: 'Красивый букет красных роз'
    },
    {
      id: 2,
      name: 'Тюльпаны',
      price: 1000,
      image: '/images/tulips.jpg',
      description: 'Нежные тюльпаны'
    }
  ]

  const mockProps = {
    products: mockProducts,
    favorites: [],
    toggleFavorite: vi.fn(),
    addToCart: vi.fn()
  }

  const renderPopularSection = (props = {}) => {
    return render(
      <BrowserRouter>
        <PopularSection {...mockProps} {...props} />
      </BrowserRouter>
    )
  }

  it('renders without crashing', () => {
    renderPopularSection()
    expect(document.body).toBeDefined()
  })

  it('displays section title', () => {
    renderPopularSection()
    expect(screen.getByText('Популярные товары')).toBeInTheDocument()
  })

  it('renders product descriptions', () => {
    renderPopularSection()
    mockProducts.forEach(product => {
      expect(screen.getByText(product.description)).toBeInTheDocument()
      expect(screen.getByText(product.price.toString())).toBeInTheDocument()
    })
  })

  it('handles empty products array', () => {
    renderPopularSection({ products: [] })
    expect(screen.getByText('Популярные товары')).toBeInTheDocument()
  })

  it('has correct layout', () => {
    renderPopularSection()
    const section = screen.getByText('Популярные товары').closest('section')
    expect(section).toHaveClass('mx-auto', 'max-w-[1200px]')
  })

  it('renders navigation buttons', () => {
    renderPopularSection()
    const prevButton = screen.getByText('<')
    const nextButton = screen.getByText('>')
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
    expect(prevButton).toBeDisabled()
    expect(nextButton).toBeDisabled()
  })

  it('renders add to cart buttons', () => {
    renderPopularSection()
    const addToCartButtons = screen.getAllByTitle('Добавить в корзину')
    expect(addToCartButtons).toHaveLength(mockProducts.length)
  })

  it('renders favorite buttons', () => {
    renderPopularSection()
    const favoriteButtons = screen.getAllByTitle('Добавить в избранное')
    expect(favoriteButtons).toHaveLength(mockProducts.length)
  })
}) 