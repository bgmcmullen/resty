import React, { useState, useReducer, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';

// Define action types
const ActionTypes = {
  SET_DATA: 'SET_DATA',
  SET_REQUEST_PARAMS: 'SET_REQUEST_PARAMS',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  CLEAR_HISTORY: 'CLEAR_HISTORY',
  SET_OLD_REQUEST_BODY: 'SET_OLD_REQUEST_BODY',
  SET_OLD_URL: 'SET_OLD_URL',
  SET_OLD_METHOD: 'SET_OLD_METHOD',
  RESTORE_HISTORY_ARRAY: 'RESTORE_HISTORY_ARRAY'
};

// Reducer function to handle state updates
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return { ...state, data: action.payload };
    case ActionTypes.SET_REQUEST_PARAMS:
      return { ...state, requestParams: action.payload };
    case ActionTypes.ADD_TO_HISTORY:
      return { ...state, historyArray: [...state.historyArray, action.payload] };
    case ActionTypes.CLEAR_HISTORY:
      return { ...state, historyArray: [] };
    case ActionTypes.SET_OLD_REQUEST_BODY:
      return { ...state, oldRequestBody: action.payload };
    case ActionTypes.SET_OLD_URL:
      return { ...state, oldUrl: action.payload };
    case ActionTypes.SET_OLD_METHOD:
      return { ...state, oldMethod: action.payload };
    case ActionTypes.RESTORE_HISTORY_ARRAY:
      return { ...state, historyArray: action.payload };
    default:
      return state;
  }
};

const initialState = {
  data: {},
  requestParams: { method: 'get' },
  historyArray: [],
  oldRequestBody: {},
  oldUrl: '',
  oldMethod: ''
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (requestBody) => {
    const response = await axios.request({
      url: state.requestParams.url,
      method: state.requestParams.method,
      data: requestBody,
    });
    try {
     

      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const callApi = async (requestBody) => {
    if (!state.requestParams.url) return;
    const results = await fetchData(requestBody);
    const updatedData = {
      count: Array.isArray(results) ? results.length : 'N/A',
      results: results,
    };
    const historyObject = { requestParams: state.requestParams, requestBody, data: updatedData };

    if (!containsIdenticalObject(state.historyArray, historyObject)) {
      dispatch({ type: ActionTypes.ADD_TO_HISTORY, payload: historyObject });
    }

    dispatch({ type: ActionTypes.SET_DATA, payload: updatedData });
  };

  function containsIdenticalObject(array, obj) {
    return array.some(item => JSON.stringify(item) === JSON.stringify(obj));
  }

  const setAppState = (newState) => {
    dispatch({ type: ActionTypes.SET_REQUEST_PARAMS, payload: newState.requestParams });
  };

  const restoreHistory = (index) => {
    const historyItem = state.historyArray[index];
    dispatch({ type: ActionTypes.SET_REQUEST_PARAMS, payload: historyItem.requestParams });
    dispatch({ type: ActionTypes.SET_DATA, payload: historyItem.data });
    dispatch({ type: ActionTypes.SET_OLD_URL, payload: historyItem.requestParams.url });
    dispatch({ type: ActionTypes.SET_OLD_REQUEST_BODY, payload: historyItem.requestBody });
    dispatch({ type: ActionTypes.SET_OLD_METHOD, payload: historyItem.requestParams.method });
  };

  const clearHistory = () => {
    dispatch({ type: ActionTypes.CLEAR_HISTORY });
    localStorage.setItem("history", JSON.stringify([]));
  }

  //add history to local storage
  useEffect(() => {
    const previousHistory = JSON.parse(localStorage.getItem("history", (state.historyArray)));

    if(previousHistory) {
      dispatch({ type: ActionTypes.RESTORE_HISTORY_ARRAY, payload: previousHistory });
    }

  }, []);

  //add history to local storage
  useEffect(() => {

    if (state.historyArray.length > 0){
      localStorage.setItem("history", JSON.stringify(state.historyArray));
    }


  }, [state.historyArray]);

  return (
    <React.Fragment>
      <Header />
      <div className="section-container">
        <section className="sidebar-section">
          <History clearHistory={clearHistory} historyArray={state.historyArray} restoreHistory={restoreHistory} />
        </section>
        <section className="main-section">
          <p id="request-labels">Request Method: {state.requestParams.method ? state.requestParams.method.toUpperCase() : null}</p>
          <p id="request-labels">URL: {state.requestParams.url}</p>
          <Form oldMethod={state.oldMethod} handleApiCall={callApi} setAppState={setAppState} oldRequestBody={state.oldRequestBody} oldUrl={state.oldUrl} />
          <Results data={state.data} />
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
