import { render } from '@testing-library/react';
import FlowerO from '../FlowerO';

describe('FlowerO', () => {
  it('корректно рендерит SVG компонент', () => {
    const { container } = render(<FlowerO />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '22');
    expect(svg).toHaveAttribute('height', '20');
    expect(svg).toHaveAttribute('viewBox', '0 0 22 20');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveClass('inline-block');
  });

  it('содержит все необходимые path элементы', () => {
    const { container } = render(<FlowerO />);
    const paths = container.querySelectorAll('path');
    
    // У нас должно быть 21 path элемент в SVG
    expect(paths).toHaveLength(21);
    
    // Проверяем первый path как пример
    const firstPath = paths[0];
    expect(firstPath).toHaveAttribute('fill', '#7B7AAB');
    expect(firstPath).toHaveAttribute('d', 'M11.7348 16.1722C11.9665 17.9197 11.2136 19.4487 10.4607 19.1211C9.47613 19.2849 9.36029 17.91 9.36029 16.2815C9.36029 14.6529 10.394 12.7319 11.0977 12.7319C11.8014 12.7319 11.7348 14.5436 11.7348 16.1722Z');
  });

  it('содержит все необходимые фильтры', () => {
    const { container } = render(<FlowerO />);
    const filters = container.querySelectorAll('filter');
    
    expect(filters).toHaveLength(3);
    expect(filters[0]).toHaveAttribute('id', 'filter0_f_150_64');
    expect(filters[1]).toHaveAttribute('id', 'filter1_f_150_64');
    expect(filters[2]).toHaveAttribute('id', 'filter2_f_150_64');
  });
}); 