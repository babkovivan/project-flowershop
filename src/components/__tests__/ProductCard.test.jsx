import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: "Сердце весны",
    description: "Воплощение свежести и радости весенних дней",
    price: "3000₽",
    image: "/images/popular1.jpg"
  }

  const mockToggleFavorite = vi.fn()

  it('renders product information correctly', () => {
    render(
      <ProductCard 
        product={mockProduct}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
      />
    )
    
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.price)).toBeInTheDocument()
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', mockProduct.image)
    expect(image).toHaveAttribute('alt', mockProduct.title)
  })

  it('handles favorite toggle correctly', () => {
    render(
      <ProductCard 
        product={mockProduct}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
      />
    )

    const favoriteButton = screen.getByRole('button')
    expect(favoriteButton).toHaveTextContent('🤍')
    
    fireEvent.click(favoriteButton)
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockProduct.id)
  })

  it('shows different heart icon when favorite', () => {
    render(
      <ProductCard 
        product={mockProduct}
        isFavorite={true}
        toggleFavorite={mockToggleFavorite}
      />
    )

    const favoriteButton = screen.getByRole('button')
    expect(favoriteButton).toHaveTextContent('❤️')
  })

  it('applies correct width class based on isCatalog prop', () => {
    const { container, rerender } = render(
      <ProductCard 
        product={mockProduct}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
        isCatalog={true}
      />
    )

    const cardElement = container.firstChild
    expect(cardElement).toHaveClass('w-[190px]')

    rerender(
      <ProductCard 
        product={mockProduct}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
        isCatalog={false}
      />
    )

    expect(cardElement).toHaveClass('w-[260px]')
  })
}) 