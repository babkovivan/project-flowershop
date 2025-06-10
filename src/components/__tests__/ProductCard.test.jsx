import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from '../ProductCard'

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Розы красные',
    price: 1500,
    image: '/images/roses.jpg',
    description: 'Красивый букет красных роз'
  }

  const mockProps = {
    product: mockProduct,
    isFavorite: false,
    toggleFavorite: vi.fn(),
    addToCart: vi.fn()
  }

  const renderProductCard = (props = {}) => {
    return render(
      <BrowserRouter>
        <ProductCard {...mockProps} {...props} />
      </BrowserRouter>
    )
  }

  it('renders without crashing', () => {
    renderProductCard()
    expect(document.body).toBeDefined()
  })

  it('displays product information', () => {
    renderProductCard()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.price.toString())).toBeInTheDocument()
  })

  it('displays product image', () => {
    renderProductCard()
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', mockProduct.image)
  })

  it('has add to cart button', () => {
    renderProductCard()
    expect(screen.getByTitle('Добавить в корзину')).toBeInTheDocument()
  })

  it('has favorite button', () => {
    renderProductCard()
    expect(screen.getByTitle('Добавить в избранное')).toBeInTheDocument()
  })

  it('shows favorite button with correct state', () => {
    const { rerender } = renderProductCard()
    
    // Проверяем начальное состояние (не в избранном)
    const notFavoriteButton = screen.getByTitle('Добавить в избранное')
    expect(notFavoriteButton).toBeInTheDocument()
    expect(notFavoriteButton).toHaveTextContent('🤍')

    // Проверяем состояние в избранном
    rerender(
      <BrowserRouter>
        <ProductCard {...mockProps} isFavorite={true} />
      </BrowserRouter>
    )
    const favoriteButton = screen.getByTitle('Удалить из избранного')
    expect(favoriteButton).toBeInTheDocument()
    expect(favoriteButton).toHaveTextContent('❤️')
  })

  it('calls toggleFavorite when favorite button is clicked', () => {
    renderProductCard()
    const favoriteButton = screen.getByTitle('Добавить в избранное')
    fireEvent.click(favoriteButton)
    expect(mockProps.toggleFavorite).toHaveBeenCalledWith(mockProduct.id)
  })

  it('calls addToCart when add to cart button is clicked', () => {
    renderProductCard()
    const addToCartButton = screen.getByTitle('Добавить в корзину')
    fireEvent.click(addToCartButton)
    expect(mockProps.addToCart).toHaveBeenCalledWith(mockProduct.id, 1)
  })
}) 