import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'

describe('Header', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    )
  }

  it('renders logo link', () => {
    renderWithRouter(<Header />)
    const logoLink = screen.getByText('Цветочная лавка')
    expect(logoLink).toBeInTheDocument()
    expect(logoLink.tagName).toBe('A')
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders favorites link', () => {
    renderWithRouter(<Header />)
    const favoritesLink = screen.getByText('Избранное')
    expect(favoritesLink).toBeInTheDocument()
    expect(favoritesLink.tagName).toBe('A')
    expect(favoritesLink).toHaveAttribute('href', '/favorites')
  })

  it('has correct styling', () => {
    renderWithRouter(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('flex', 'justify-between', 'items-center', 'p-4', 'bg-[#eee]', 'shadow')
    
    const favoritesLink = screen.getByText('Избранное')
    expect(favoritesLink).toHaveClass('px-3', 'py-1', 'rounded', 'bg-slate-200')
  })
}) 