import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutUsSection from '../AboutUsSection';

describe('AboutUsSection Component', () => {
  const renderAboutUs = () => {
    return render(<AboutUsSection />);
  };

  it('renders without crashing', () => {
    renderAboutUs();
    expect(document.body).toBeDefined();
  });

  it('displays welcome message', () => {
    renderAboutUs();
    expect(screen.getByText('Добро пожаловать в наш цветочный мир!')).toBeInTheDocument();
  });

  it('shows company description', () => {
    renderAboutUs();
    expect(screen.getByText(/Мы — команда флористов/i)).toBeInTheDocument();
  });

  it('displays decorative elements', () => {
    renderAboutUs();
    const flowers = screen.getAllByText('✿');
    expect(flowers).toHaveLength(2);
  });

  it('has correct layout', () => {
    renderAboutUs();
    const section = screen.getByText('Добро пожаловать в наш цветочный мир!').closest('section');
    expect(section).toHaveClass('relative', 'mx-auto', 'max-w-6xl');
  });

  it('displays images', () => {
    renderAboutUs();
    expect(screen.getByRole('img', { name: 'Волнистый фон' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Флорист' })).toBeInTheDocument();
  });
}); 