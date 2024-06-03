import React from 'react';
import { render } from '@testing-library/react';
import Header from './index.jsx';

describe('Header component', () => {
  test('renders header with correct text', () => {
    const { getByRole } = render(<Header />);
    const headerElement = getByRole('heading', { name: /RESTy/i });
    expect(headerElement).toBeInTheDocument();
  });

  test('renders h1 element with "RESTy"', () => {
    const { getByText } = render(<Header />);
    const h1Element = getByText(/RESTy/i);
    expect(h1Element).toBeInTheDocument();
  });
});