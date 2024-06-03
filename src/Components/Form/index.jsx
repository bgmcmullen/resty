import React, { useState } from 'react';

import './Form.scss';

function Form(props) {

  const [url, setUrl] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      method: 'GET',
      url: url,
    };
    props.handleApiCall(formData);
  }

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  return (
      <>
      <div id='formContainer'>
        <form onSubmit={handleSubmit}>
          <label className="URL">
            <span>URL: </span>
            <input name='url' type='text' onChange={handleUrlChange}/>
            <button type="submit">GO!</button>
          </label>
          <div id='http-buttons'>
          <label className="methods">
            <span id="get">GET</span>
            <span id="post">POST</span>
            <span id="put">PUT</span>
            <span id="delete">DELETE</span>
          </label>
          </div>
   
        </form>
        </div>
      </>
      );
}

      export default Form;
