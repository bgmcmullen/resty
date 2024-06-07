import React, { useState, useEffect, useRef } from 'react';

import './Form.scss';

function Form(props) {

  const [url, setUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [method, setMethod] = useState('get');
  const [jsonColor, setJsonColor] = useState('green');
  const [jsonBody, setJsonBody] = useState({})

  const getRef = useRef(null);
  const postRef = useRef(null);
  const putRef = useRef(null);
  const deleteRef = useRef(null);

  useEffect(() => {

    props.setAppState({ requestParams: { ...props.requestParams, method, url }});
  }, [url, method]);

  useEffect(() => {
    if(props.oldRequestBody)
      setJsonBody(JSON.stringify(props.oldRequestBody));
    else
      setJsonBody(JSON.stringify({}));
    setJsonColor('green');
  }, [props.oldRequestBody])

  useEffect(() => {
    setUrl(props.oldUrl);
  }, [props.oldUrl])

  useEffect(() => {
    setMethod(props.oldMethod);

  }, [props.oldMethod])

  useEffect(() => {
    if (method === 'get') {
      getRef.current.click();
    } else if (method === 'post') {
      postRef.current.click();
    } else if (method === 'put') {
      putRef.current.click();
    } else if (method === 'delete') {
      deleteRef.current.click();
    }
  }, [method]); 

  function handleSubmit(e) {
    e.preventDefault();
    props.handleApiCall(requestBody);
  }

  function handleUrlChange(e) {
    const urlString = e.target.value
    setUrl(urlString)
  }

  function handleMethodChange(e) {
    const newMethod = e.target.value;
    setMethod(newMethod);
  }
  

  function handleJSONChange(e){
    let requestBody = e.target.value;
    setJsonBody(e.target.value);
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
            <input name='url' type='text' onChange={handleUrlChange} value={url}/>
            <button type="submit">GO!</button>
          </label>
          <div id='http-buttons'>
            <label className="methods">
              <label>
                <input ref={getRef} type="radio" name="method" value="get" onChange={handleMethodChange} checked={method === 'get'} />
                <span id="get">GET</span>
              </label>
              <label>
                <input ref={postRef} type="radio" name="method" value="post" onChange={handleMethodChange} />
                <span id="post">POST</span>
              </label>
              <label>
                <input ref={putRef} type="radio" name="method" value="put" onChange={handleMethodChange} />
                <span id="put">PUT</span>
              </label>
              <label>
                <input ref={deleteRef} type="radio" name="method" value="delete" onChange={handleMethodChange} />
                <span id="delete">DELETE</span>
              </label>
            </label>
          </div>
        </form>
      </div>
      <h4>JSON Body:</h4>
      <textarea id="JSON-input" onChange={handleJSONChange} data-testid="json-input" style={{color: jsonColor}} value={jsonBody}>
      </textarea>
    </>
  );
}

export default Form;
