import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
  }

  it('renders without crashing', () => {
    renderHeader()
    expect(document.body).toBeDefined()
  })

  it('contains navigation links', () => {
    renderHeader()
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    expect(links[0]).toHaveAttribute('href', '/')
  })

  it('has correct layout', () => {
    renderHeader()
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-[#F5F5F8]')
  })

  it('displays logo SVG', () => {
    renderHeader()
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
}) 