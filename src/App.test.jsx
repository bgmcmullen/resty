import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App.jsx';

// Mocking Axios
jest.mock('axios');

xdescribe('App', () => {
  it('fetches data correctly on form submission with N/A count', async () => {
    const mockData = {"id":"1","name":"apple","calories":"90","type":"fruit","createdAt":"2024-06-04T22:56:46.314Z","updatedAt":"2024-06-05T17:59:38.395Z"};
    axios.request.mockResolvedValueOnce({ data: mockData });

    // Render the component
    const { getByText, getByLabelText, getByTestId } = render(<App />);

    // Simulate form submission
    fireEvent.change(getByLabelText('URL:'), { target: { value: 'https://example.com/api' } });
    fireEvent.change(getByTestId('json-input'), { target: { value: '{}' } });
    fireEvent.click(getByText('GO!'));

    // Wait for the API call to complete
    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith({
        url: 'https://example.com/api',
        method: 'get',
        data: {},
      });
    });


    await waitFor(() => {
          // Check if the fetched data is displayed correctly
      expect(getByText(/Response:/i)).toBeInTheDocument();
      expect(getByText('Count: N/A')).toBeInTheDocument();
      expect(getByText('{"id":"1","name":"apple","calories":"90","type":"fruit","createdAt":"2024-06-04T22:56:46.314Z","updatedAt":"2024-06-05T17:59:38.395Z"}')).toBeInTheDocument();
    });
  });

  it('fetches data correctly on form submission with 9 count', async () => {
    const mockData = [{"id":3,"name":"apple2new","calories":55,"type":"fruit","createdAt":"2024-06-04T23:11:16.954Z","updatedAt":"2024-06-04T23:11:16.954Z"},
    {"id":5,"name":"apple2new4","calories":55,"type":"fruit","createdAt":"2024-06-04T23:12:39.248Z","updatedAt":"2024-06-04T23:12:39.248Z"},
    {"id":6,"name":"apple2new4","calories":55,"type":"fruit","createdAt":"2024-06-04T23:13:29.091Z","updatedAt":"2024-06-04T23:13:29.091Z"},
    {"id":7,"name":"apple2new4","calories":55,"type":"fruit","createdAt":"2024-06-04T23:14:02.870Z","updatedAt":"2024-06-04T23:14:02.870Z"},
    {"id":8,"name":"apple","calories":50,"type":"fruit","createdAt":"2024-06-04T23:15:48.978Z","updatedAt":"2024-06-04T23:15:48.978Z"},
    {"id":9,"name":"apple","calories":50,"type":"fruit","createdAt":"2024-06-04T23:16:34.988Z","updatedAt":"2024-06-04T23:16:34.988Z"},
    {"id":10,"name":"apple","calories":50,"type":"fruit","createdAt":"2024-06-04T23:16:42.556Z","updatedAt":"2024-06-04T23:16:42.556Z"},
    {"id":11,"name":"apple","calories":50,"type":"fruit","createdAt":"2024-06-04T23:17:09.711Z","updatedAt":"2024-06-04T23:17:09.711Z"},
    {"id":1,"name":"apple","calories":90,"type":"fruit","createdAt":"2024-06-04T22:56:46.314Z","updatedAt":"2024-06-05T17:59:38.395Z"}];
    axios.request.mockResolvedValueOnce({ data: mockData });

    // Render the component
    const { getByText, getByLabelText, getByTestId } = render(<App />);

    // Simulate form submission
    fireEvent.change(getByLabelText('URL:'), { target: { value: 'https://example.com/api' } });
    fireEvent.change(getByTestId('json-input'), { target: { value: '{}' } });
    fireEvent.click(getByText('GO!'));

    // Wait for the API call to complete
    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith({
        url: 'https://example.com/api',
        method: 'get', // Assuming default method is 'get'
        data: {}, // Assuming default empty object
      });
    });


    await waitFor(() => {
          // Check if the fetched data is displayed correctly
      expect(getByText(/Response:/i)).toBeInTheDocument();
      expect(getByText('Count: 9')).toBeInTheDocument();
      expect(getByText('{"id":3,"name":"apple2new","calories":55,"type":"fruit","createdAt":"2024-06-04T23:11:16.954Z","updatedAt":"2024-06-04T23:11:16.954Z"}')).toBeInTheDocument();
      expect(getByText('{"id":5,"name":"apple2new4","calories":55,"type":"fruit","createdAt":"2024-06-04T23:12:39.248Z","updatedAt":"2024-06-04T23:12:39.248Z"}')).toBeInTheDocument();
      expect(getByText('{"id":6,"name":"apple2new4","calories":55,"type":"fruit","createdAt":"2024-06-04T23:13:29.091Z","updatedAt":"2024-06-04T23:13:29.091Z"}')).toBeInTheDocument();
      expect(getByText('{"id":7,"name":"apple2new4","calories":55,"type":"fruit","createdAt":"2024-06-04T23:14:02.870Z","updatedAt":"2024-06-04T23:14:02.870Z"}')).toBeInTheDocument();
      expect(getByText('{"id":8,"name":"apple","calories":50,"type":"fruit","createdAt":"2024-06-04T23:15:48.978Z","updatedAt":"2024-06-04T23:15:48.978Z"}')).toBeInTheDocument();
      expect(getByText('{"id":9,"name":"apple","calories":50,"type":"fruit","createdAt":"2024-06-04T23:16:34.988Z","updatedAt":"2024-06-04T23:16:34.988Z"}')).toBeInTheDocument();
      expect(getByText('{"id":10,"name":"apple","calories":50,"type":"fruit","createdAt":"2024-06-04T23:16:42.556Z","updatedAt":"2024-06-04T23:16:42.556Z"}')).toBeInTheDocument();
      expect(getByText('{"id":11,"name":"apple","calories":50,"type":"fruit","createdAt":"2024-06-04T23:17:09.711Z","updatedAt":"2024-06-04T23:17:09.711Z"}')).toBeInTheDocument();
      expect(getByText('{"id":1,"name":"apple","calories":90,"type":"fruit","createdAt":"2024-06-04T22:56:46.314Z","updatedAt":"2024-06-05T17:59:38.395Z"}')).toBeInTheDocument();
    });
  });


  it('runs a post request', async () => {
    const mockData = {"id":"1","name":"apple","calories":"90","type":"fruit","createdAt":"2024-06-04T22:56:46.314Z","updatedAt":"2024-06-05T17:59:38.395Z"};
    axios.request.mockResolvedValueOnce({ data: mockData });

    // Render the component
    const { getByText, getByLabelText, getByTestId } = render(<App />);

    // Simulate form submission
    fireEvent.change(getByLabelText('URL:'), { target: { value: 'https://example.com/api' } });
    fireEvent.change(getByTestId('json-input'), { target: { value: '{"id":"1","name":"apple","calories":"90","type":"fruit","createdAt":"2024-06-04T22:56:46.314Z","updatedAt":"2024-06-05T17:59:38.395Z"}' } });
    fireEvent.click(getByText('POST'));
    fireEvent.click(getByText('GO!'));

    // Wait for the API call to complete
    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith({
        url: 'https://example.com/api',
        method: 'post',
        data: {"id":"1","name":"apple","calories":"90","type":"fruit","createdAt":"2024-06-04T22:56:46.314Z","updatedAt":"2024-06-05T17:59:38.395Z"},
      });
    });

  });

  it('runs a put request', async () => {
    const mockData = {"id":"1","name":"apple","calories":"90","type":"fruit","createdAt":"2024-06-04T22:56:46.314Z","updatedAt":"2024-06-05T17:59:38.395Z"};
    axios.request.mockResolvedValueOnce({ data: mockData });

    // Render the component
    const { getByText, getByLabelText, getByTestId } = render(<App />);

    // Simulate form submission
    fireEvent.change(getByLabelText('URL:'), { target: { value: 'https://example.com/api' } });
    fireEvent.change(getByTestId('json-input'), { target: { value: '{"id":"1","name":"apple","calories":"90","type":"fruit","createdAt":"2024-06-04T22:56:46.314Z","updatedAt":"2024-06-05T17:59:38.395Z"}' } });
    fireEvent.click(getByText('PUT'));
    fireEvent.click(getByText('GO!'));

    // Wait for the API call to complete
    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith({
        url: 'https://example.com/api',
        method: 'put',
        data: {"id":"1","name":"apple","calories":"90","type":"fruit","createdAt":"2024-06-04T22:56:46.314Z","updatedAt":"2024-06-05T17:59:38.395Z"},
      });
    });
  });


  it('runs a put request', async () => {
    const mockData = {};
    axios.request.mockResolvedValueOnce({ data: mockData });

    // Render the component
    const { getByText, getByLabelText, getByTestId } = render(<App />);

    // Simulate form submission
    fireEvent.change(getByLabelText('URL:'), { target: { value: 'https://example.com/api' } });
    fireEvent.change(getByTestId('json-input'), { target: { value: '{}' } });
    fireEvent.click(getByText('DELETE'));
    fireEvent.click(getByText('GO!'));

    // Wait for the API call to complete
    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith({
        url: 'https://example.com/api',
        method: 'delete',
        data: {},
      });
    });
  });
  
});