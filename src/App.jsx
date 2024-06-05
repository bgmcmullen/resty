import React, { useState, useCallback } from 'react';

import './App.scss';

import axios from 'axios';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

const App = () => {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({ method: 'get', url: '' });
  const [requestBody, setRequestBody] = useState(null);

  const fetchData = useCallback(async (requestBody) => {
    try {
      const response = await axios.request({
        url: requestParams.url,
        method: requestParams.method,
        data: requestBody,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }, [requestParams]);

  const callApi = useCallback(async (requestBody) => {
    if (!requestParams.url) return;

    const results = await fetchData(requestBody);

    const data = {
      count: Array.isArray(results) ? results.length : 'N/A',
      results: results,
    };

    setData(data);
  }, [fetchData, requestParams]);

  const setAppState = (newState) => {
    if (newState.requestParams) {
      setRequestParams(newState.requestParams);
    }
    if (newState.data) {
      setData(newState.data);
    }
    if (newState.requestBody) {
      setRequestBody(newState.requestBody);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <h4 id="request-labels">Request Method: {requestParams.method ? requestParams.method.toUpperCase() : null}</h4>
      <h4 id="request-labels">URL: {requestParams.url}</h4>
      <Form handleApiCall={callApi} setAppState={setAppState} requestParams={requestParams} />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );
};

export default App;
