import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PopularSection from '../PopularSection'

// Мокаем изображения, так как они могут не существовать в тестовом окружении
vi.mock('/images/popular1.jpg', () => 'mocked-image-1')
vi.mock('/images/popular2.jpg', () => 'mocked-image-2')
vi.mock('/images/popular3.jpg', () => 'mocked-image-3')
vi.mock('/images/popular4.jpg', () => 'mocked-image-4')

describe('PopularSection', () => {
  it('renders section title correctly', () => {
    render(<PopularSection />)
    const titleElement = screen.getByRole('heading', { level: 2 })
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.textContent).toBe('Популярныетовары')
  })

  it('renders all product cards', () => {
    render(<PopularSection />)
    expect(screen.getByText('Сердце весны')).toBeInTheDocument()
    expect(screen.getByText('Нежность облаков')).toBeInTheDocument()
    expect(screen.getByText('Мелодия счастья')).toBeInTheDocument()
    expect(screen.getByText('Сказка любви')).toBeInTheDocument()
  })

  it('handles favorite toggle correctly', () => {
    render(<PopularSection />)
    const favoriteButtons = screen.getAllByRole('button').filter(button => 
      button.textContent === '🤍' || button.textContent === '❤️'
    )
    
    // Проверяем, что изначально все кнопки показывают '🤍'
    expect(favoriteButtons[0]).toHaveTextContent('🤍')
    
    // Кликаем по первой кнопке избранного
    fireEvent.click(favoriteButtons[0])
    
    // Проверяем, что кнопка теперь показывает '❤️'
    expect(favoriteButtons[0]).toHaveTextContent('❤️')
  })

  it('has navigation buttons', () => {
    render(<PopularSection />)
    const [leftButton, rightButton] = screen.getAllByRole('button').filter(button => 
      button.textContent === '←' || button.textContent === '→'
    )
    
    expect(leftButton).toHaveTextContent('←')
    expect(rightButton).toHaveTextContent('→')
  })

  it('handles scroll buttons correctly', () => {
    render(<PopularSection />)
    const [leftButton, rightButton] = screen.getAllByRole('button').filter(button => 
      button.textContent === '←' || button.textContent === '→'
    )
    
    const container = screen.getByTestId('products-container')
    expect(container.style.transform).toBe('translateX(-0px)')
    
    fireEvent.click(rightButton)
    expect(container.style.transform).toBe('translateX(-276px)')
    
    fireEvent.click(leftButton)
    expect(container.style.transform).toBe('translateX(-0px)')
  })
}) 