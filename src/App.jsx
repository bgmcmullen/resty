import React from 'react';

import './App.scss';

import axios from 'axios';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {method: 'get'},
      requestBody: null
    };
  }

  async fetchData(requestBody) {

    try {
      const response = await axios.request({
        url: this.state.requestParams.url,
        method: this.state.requestParams.method, // Use the dynamic HTTP method here
        data: requestBody 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  callApi = async(requestBody)  => {
    if(!this.state.requestParams.url)
      return;
    const results = await this.fetchData(requestBody);
    
    const data = {
      count: Array.isArray(results) ? results.length: 'N/A',
      results: results
    };
    this.setState({data});
  }

  setAppState = (newState) => {
    this.setState(newState);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <h4 id="request-labels">Request Method: {this.state.requestParams.method ? this.state.requestParams.method.toUpperCase() : null}</h4>
        <h4 id="request-labels">URL: {this.state.requestParams.url}</h4>
        <Form handleApiCall={this.callApi} setAppState={this.setAppState}/>
        <Results data={this.state.data} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
