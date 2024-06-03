import React from 'react';
import { render } from '@testing-library/react';
import Footer from './index.jsx';

describe('Footer component', () => {
  test('renders footer with correct text', () => {
    const { getByText } = render(<Footer />);
    const footerElement = getByText(/\u00A9 2024/);
    expect(footerElement).toBeInTheDocument();
  });
});
