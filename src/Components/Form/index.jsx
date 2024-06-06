import React, { useState, useEffect } from 'react';

import './Form.scss';

function Form(props) {

  const [url, setUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [method, setMethod] = useState('get');
  const [jsonColor, setJsonColor] = useState('green');

  useEffect(() => {

    props.setAppState({ requestParams: { ...props.requestParams, method, url }});
  }, [url, method]);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleApiCall(requestBody);
  }

  function handleUrlChange(e) {
    // setUrl(e.target.value);
    const urlString = e.target.value
    setUrl(urlString)
    // props.setAppState({ requestParams: { ...props.requestParams, method, url: urlString } });
  }

  function handleMethodChange(e) {
    const newMethod = e.target.value;
    setMethod(newMethod);
    // props.setAppState({ requestParams: { ...props.requestParams, method: newMethod, url } });
  }

  function handleJSONChange(e){
    let requestBody = e.target.value;
    try {
      requestBody = JSON.parse(e.target.value);
    } catch {
      setJsonColor('red');
      setRequestBody(requestBody);
      return;
    }
    setJsonColor('green');
    setRequestBody(requestBody);
  }

  return (
    <>
      <div id='formContainer'>
        <form onSubmit={handleSubmit}>
          <label className="URL">
            <span id="url">URL: </span>
            <input name='url' type='text' onChange={handleUrlChange} />
            <button type="submit">GO!</button>
          </label>
          <div id='http-buttons'>
            <label className="methods">
              <label>
                <input type="radio" name="method" value="get" onChange={handleMethodChange} checked={method === 'get'} />
                <span id="get">GET</span>
              </label>
              <label>
                <input type="radio" name="method" value="post" onChange={handleMethodChange} />
                <span id="post">POST</span>
              </label>
              <label>
                <input type="radio" name="method" value="put" onChange={handleMethodChange} />
                <span id="put">PUT</span>
              </label>
              <label>
                <input type="radio" name="method" value="delete" onChange={handleMethodChange} />
                <span id="delete">DELETE</span>
              </label>
            </label>
          </div>
        </form>
      </div>
      <h4>JSON Body:</h4>
      <textarea id="JSON-input" onChange={handleJSONChange} data-testid="json-input" style={{color: jsonColor}}>
      </textarea>
    </>
  );
}

export default Form;
