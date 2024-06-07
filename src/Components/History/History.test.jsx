import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import History from './index.jsx';

describe('History Component', () => {
  const mockRestoreHistory = jest.fn();
  const mockClearHistory = jest.fn();

  const historyArray = [
    { requestParams: { method: 'get', url: 'http://example.com/get' } },
    { requestParams: { method: 'post', url: 'http://example.com/post' } },
    { requestParams: { method: 'put', url: 'http://example.com/put' } },
    { requestParams: { method: 'delete', url: 'http://example.com/delete' } },
  ];

  it('renders without crashing', () => {
    const { getByText } = render(<History historyArray={historyArray} restoreHistory={mockRestoreHistory} clearHistory={mockClearHistory} />);
    expect(getByText('Restore History')).toBeInTheDocument();
  });

  it('displays the correct method colors', () => {
    const { getByText } = render(<History historyArray={historyArray} restoreHistory={mockRestoreHistory} clearHistory={mockClearHistory} />);
    expect(getByText('GET')).toHaveStyle('background: lightblue');
    expect(getByText('POST')).toHaveStyle('background: green');
    expect(getByText('PUT')).toHaveStyle('background: yellow');
    expect(getByText('DELETE')).toHaveStyle('background: red');
  });

  it('calls restoreHistory with the correct index when a history item is clicked', () => {
    const { getAllByText } = render(<History historyArray={historyArray} restoreHistory={mockRestoreHistory} clearHistory={mockClearHistory} />);
    const historyItems = getAllByText(/GET|POST|PUT|DELETE/);

    fireEvent.click(historyItems[0]);
    expect(mockRestoreHistory).toHaveBeenCalledWith('0');

    fireEvent.click(historyItems[1]);
    expect(mockRestoreHistory).toHaveBeenCalledWith('1');

    fireEvent.click(historyItems[2]);
    expect(mockRestoreHistory).toHaveBeenCalledWith('2');

    fireEvent.click(historyItems[3]);
    expect(mockRestoreHistory).toHaveBeenCalledWith('3');
  });

  it('calls clearHistory when the clear button is clicked', () => {
    const { getByText } = render(<History historyArray={historyArray} restoreHistory={mockRestoreHistory} clearHistory={mockClearHistory} />);
    fireEvent.click(getByText('Clear History'));
    expect(mockClearHistory).toHaveBeenCalled();
  });
});
