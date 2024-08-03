import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';
import Form from './index.jsx';

describe('Form Component', () => {
  let handleApiCallMock;
  let setAppStateMock;

  beforeEach(() => {
    handleApiCallMock = jest.fn();
    setAppStateMock = jest.fn();
  });

  test('renders form correctly', () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <Form handleApiCall={handleApiCallMock} setAppState={setAppStateMock} />
    );

    expect(getByLabelText('URL:')).toBeInTheDocument();
    expect(getByText('GO!')).toBeInTheDocument();
    expect(getByTestId('json-input')).toBeInTheDocument();
    expect(getByLabelText('GET')).toBeInTheDocument();
    expect(getByLabelText('POST')).toBeInTheDocument();
    expect(getByLabelText('PUT')).toBeInTheDocument();
    expect(getByLabelText('DELETE')).toBeInTheDocument();
  });

  test('handles URL change correctly', async() => {
    const { getByLabelText } = render(
      <Form handleApiCall={handleApiCallMock} setAppState={setAppStateMock} requestParams={{}} />
    );

    fireEvent.change(getByLabelText('URL:'), { target: { value: 'https://example.com/api' } });

      expect(setAppStateMock).toHaveBeenCalledWith({
        requestParams: { url: 'https://example.com/api', method: 'get'},
      });

});

  test('handles method change correctly', () => {
    const { getByLabelText } = render(
      <Form handleApiCall={handleApiCallMock} setAppState={setAppStateMock} requestParams={{ url: '' }} />
    );

    fireEvent.click(getByLabelText('POST'));

    waitFor(() => {
      expect(setAppStateMock).toHaveBeenCalledWith({
        requestParams: { method: 'post'},
      });
    });
 

  });

  test('handles JSON body change correctly', () => {
    const { getByTestId } = render(
      <Form handleApiCall={handleApiCallMock} setAppState={setAppStateMock} />
    );

    fireEvent.change(getByTestId('json-input'), { target: { value: '{"key":"value"}' } });

    expect(JSON.parse(getByTestId('json-input').value)).toEqual({ key: 'value' });
  });

  test('handles form submission correctly', () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <Form handleApiCall={handleApiCallMock} setAppState={setAppStateMock} />
    );

    fireEvent.change(getByLabelText('URL:'), { target: { value: 'https://example.com/api' } });
    fireEvent.change(getByTestId('json-input'), { target: { value: '{"key":"value"}' } });
    fireEvent.click(getByText('GO!'));

    expect(handleApiCallMock).toHaveBeenCalledWith({ key: 'value' });
  });
});
