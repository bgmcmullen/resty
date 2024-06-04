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
      requestParams: {method: ''},
    };
  }

  async fetchData(url){
    const response = await axios.get(url);
    return response.data.results;

  }

  callApi = async(requestParams)  => {
    if(!requestParams.url)
      return;
    const results = await this.fetchData(requestParams.url);
    console.log(results);
    
    const data = {
      count: results.length,
      results: results
    };
    this.setState({data, requestParams});
  }

  setAppState = (newState) => {
    this.setState(newState);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {this.state.requestParams.method.toUpperCase()}</div>
        <div>URL: {this.state.requestParams.url}</div>
        <Form handleApiCall={this.callApi} setAppState={this.setAppState}/>
        <Results data={this.state.data} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
