import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';

const App = () => {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({ method: 'get' });
  const [historyArray, setHistoryArray] = useState([]);
  useEffect(() => {
    console.log(historyArray);
  }, [historyArray]);

  const fetchData = async (requestBody) => {
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
  };

  const callApi = async (requestBody) => {
    if (!requestParams.url) return;
    const results = await fetchData(requestBody);
    const updatedData = {
      count: Array.isArray(results) ? results.length : 'N/A',
      results: results,
    };
    const historyObject = {...requestParams, requestBody, ...updatedData};
    
    setHistoryArray([...historyArray, historyObject]);
    setData(updatedData);
  };

  const setAppState = (newState) => {
    setRequestParams(newState.requestParams);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="section-container">
        <section className="sidebar-section">
          <History />
        </section>
        <section className="main-section">
          <h4 id="request-labels">Request Method: {requestParams.method ? requestParams.method.toUpperCase() : null}</h4>
          <h4 id="request-labels">URL: {requestParams.url}</h4>
          <Form handleApiCall={callApi} setAppState={setAppState} />
          <Results data={data} />
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
