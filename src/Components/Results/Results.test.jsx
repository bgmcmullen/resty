import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the additional matchers
import Results from './index.jsx'; // Ensure this path is correct

xdescribe('Results component', () => {
  test('renders count when data is provided', () => {
    const data = { count: 5, results: [] };
    const { getByText } = render(<Results data={data} />);
    const countElement = getByText('Count: 5');
    expect(countElement).toBeInTheDocument();
  });

  test('renders each result item when data is provided', () => {
    const data = {
      count: 3,
      results: [{ name: 'Result 1' }, { name: 'Result 2' }, { name: 'Result 3' }],
    };
    const { getByText } = render(<Results data={data} />);
    const result1 = getByText(JSON.stringify({ name: 'Result 1' }));
    const result2 = getByText(JSON.stringify({ name: 'Result 2' }));
    const result3 = getByText(JSON.stringify({ name: 'Result 3' }));
    expect(result1).toBeInTheDocument();
    expect(result2).toBeInTheDocument();
    expect(result3).toBeInTheDocument();
  });

  test('does not render count or results when data is not provided', () => {
    const { queryByText } = render(<Results />);
    const countElement = queryByText(/Count:/);
    const resultElement = queryByText(/Result/);
    expect(countElement).toBeNull();
    expect(resultElement).toBeNull();
  });

  test('does not render results when data does not have results', () => {
    const data = null;
    const { queryByRole } = render(<Results data={data} />);
    const listElement = queryByRole('list');
    expect(listElement).toBeNull();
  });
});
