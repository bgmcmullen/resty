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
  const [oldRequestBody, setOldRequestBody] = useState({});
  const [oldUrl, setOrlUrl] = useState('');
  const [oldMethod, setOldMethod] = useState('get');

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
    const historyObject = {requestParams, requestBody, data: updatedData};

    if(!containsIdenticalObject(historyArray, historyObject)){
      setHistoryArray([...historyArray, historyObject]);
    }

    setData(updatedData);
  };

  function containsIdenticalObject(array, obj) {
    return array.some(item => JSON.stringify(item) === JSON.stringify(obj));
  }

  const setAppState = (newState) => {
    setRequestParams(newState.requestParams);
  };

  const restoreHistory = (index) => {
    setRequestParams(historyArray[index].requestParams);
    setData(historyArray[index].data);
    setOrlUrl(historyArray[index].requestParams.url);
    setOldRequestBody(historyArray[index].requestBody);
    setOldMethod(historyArray[index].requestParams.method);
  
  };

  const clearHistory = () => {
    setHistoryArray([]);
  }

  return (
    <React.Fragment>
      <Header />
      <div className="section-container">
        <section className="sidebar-section">
          <History clearHistory={clearHistory} historyArray={historyArray} restoreHistory={restoreHistory}/>
        </section>
        <section className="main-section">
          <h4 id="request-labels">Request Method: {requestParams.method ? requestParams.method.toUpperCase() : null}</h4>
          <h4 id="request-labels">URL: {requestParams.url}</h4>
          <Form oldMethod={oldMethod} handleApiCall={callApi} setAppState={setAppState} oldRequestBody={oldRequestBody} oldUrl={oldUrl}/>
          <Results data={data} />
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
