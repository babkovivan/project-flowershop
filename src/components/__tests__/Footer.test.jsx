import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(<Footer />);
  };

  it('renders without crashing', () => {
    renderFooter();
    expect(document.body).toBeDefined();
  });

  it('displays social media section', () => {
    renderFooter();
    expect(screen.getByText('Наши соц-сети')).toBeInTheDocument();
  });

  it('shows business hours', () => {
    renderFooter();
    expect(screen.getByText('Мы открыты:')).toBeInTheDocument();
    expect(screen.getByText('ПН-ПЦ 9:00-21:00')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    renderFooter();
    expect(screen.getByText(/контактный номер/i)).toBeInTheDocument();
    expect(screen.getByText('89229222922')).toBeInTheDocument();
  });

  it('shows address information', () => {
    renderFooter();
    expect(screen.getByText('г.Санкт-Петербург')).toBeInTheDocument();
    expect(screen.getByText('м.Гончаровская')).toBeInTheDocument();
  });

  it('has social media links', () => {
    renderFooter();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4); // WhatsApp, VK, Telegram, Phone
    expect(links[0]).toHaveAttribute('href', 'https://wa.me/89229222922');
    expect(links[1]).toHaveAttribute('href', 'https://vk.com/');
    expect(links[2]).toHaveAttribute('href', 'https://t.me/');
  });

  it('has correct layout classes', () => {
    renderFooter();
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('mt-auto');
  });
}); 