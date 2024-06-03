import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from './index.jsx';

describe('Form component', () => {
  test('calls handleApiCall with correct formData when form is submitted', () => {
    const handleApiCall = jest.fn();
    const { getByLabelText, getByText } = render(<Form handleApiCall={handleApiCall} />);
    
    const urlInput = getByLabelText('URL:');
    const submitButton = getByText('GO!');
    
    // Enter a URL in the input field
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Check if handleApiCall has been called with the correct formData
    expect(handleApiCall).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://example.com',
    });
  });

  test('updates url state when input value changes', () => {
    const { getByLabelText } = render(<Form />);
    const urlInput = getByLabelText('URL:');
    
    // Enter a URL in the input field
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    
    // Check if the url state is updated correctly
    expect(urlInput.value).toBe('https://example.com');
  });
});
