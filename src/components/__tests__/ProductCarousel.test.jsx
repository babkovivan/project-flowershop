import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCarousel from '../ProductCarousel';

describe('ProductCarousel Component', () => {
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
  ];

  const mockProps = {
    products: mockProducts,
    favorites: [],
    toggleFavorite: vi.fn(),
    addToCart: vi.fn()
  };

  const renderCarousel = (props = {}) => {
    return render(
      <BrowserRouter>
        <ProductCarousel {...mockProps} {...props} />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderCarousel();
    expect(document.body).toBeDefined();
  });

  it('displays products', () => {
    renderCarousel();
    mockProducts.forEach(product => {
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(product.price.toString())).toBeInTheDocument();
    });
  });

  it('has navigation buttons', () => {
    renderCarousel();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('handles add to cart', () => {
    renderCarousel();
    const cartButtons = screen.getAllByTitle('Добавить в корзину');
    fireEvent.click(cartButtons[0]);
    expect(mockProps.addToCart).toHaveBeenCalledWith(mockProducts[0].id, 1);
  });

  it('handles favorite toggle', () => {
    renderCarousel();
    const favoriteButtons = screen.getAllByTitle('Добавить в избранное');
    fireEvent.click(favoriteButtons[0]);
    expect(mockProps.toggleFavorite).toHaveBeenCalledWith(mockProducts[0].id);
  });
}); 