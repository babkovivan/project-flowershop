import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import CatalogSection from '../CatalogSection';

// Мокаем react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn()
  };
});

describe('CatalogSection', () => {
  const mockNavigate = vi.fn();
  
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: '/catalogue/news' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('отображает все категории', () => {
    render(
      <BrowserRouter>
        <CatalogSection />
      </BrowserRouter>
    );

    expect(screen.getByText('новинки')).toBeInTheDocument();
    expect(screen.getByText('весенние хиты')).toBeInTheDocument();
    expect(screen.getByText('свадебные')).toBeInTheDocument();
    expect(screen.getByText('экзотические')).toBeInTheDocument();
  });

  it('вызывает navigate с правильным путем при клике на категорию', () => {
    render(
      <BrowserRouter>
        <CatalogSection />
      </BrowserRouter>
    );
    
    screen.getByText('свадебные').click();
    expect(mockNavigate).toHaveBeenCalledWith('/catalogue/wedding');
  });

  it('отображает активную категорию с подчеркиванием', () => {
    useLocation.mockReturnValue({ pathname: '/catalogue/wedding' });
    
    render(
      <BrowserRouter>
        <CatalogSection />
      </BrowserRouter>
    );

    const activeButton = screen.getByText('свадебные').closest('button');
    expect(activeButton).toHaveClass('after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black');
  });
}); 