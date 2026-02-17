import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { ProductCard } from './ProductCard';
import { MantineProvider } from '@mantine/core';


import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});


const renderCard = (props: any) => {
  return render(
    <MantineProvider>
      <ProductCard {...props} />
    </MantineProvider>
  );
};

describe('Карточка товара (ProductCard)', () => {
  
  afterEach(() => {
    cleanup();
  });

  const props = {
    id: 1,
    title: 'Яблоко',
    weight: '1 кг',
    price: 100,
    image: 'img.png',
    onAdd: vi.fn(),
  };

  it('1. Правильно показывает название и цену', () => {
    renderCard(props);
    
    expect(screen.getByText('Яблоко')).toBeInTheDocument();
    expect(screen.getByText('$ 100')).toBeInTheDocument();
  });

  it('2. Кнопка "Плюс" увеличивает число', () => {
    renderCard(props);

    const plusBtn = screen.getByTestId('plus-btn');
    const counter = screen.getByTestId('count-value');

    expect(counter).toHaveTextContent('1');

    fireEvent.click(plusBtn);

    expect(counter).toHaveTextContent('2');
    expect(screen.getByText('$ 200')).toBeInTheDocument();
  });

  it('3. Кнопка "Add to cart" отправляет товар в корзину', () => {
    renderCard(props);

    const addBtn = screen.getByTestId('add-to-cart-btn');
    fireEvent.click(addBtn);

    expect(props.onAdd).toHaveBeenCalledWith(1);
  });
});
