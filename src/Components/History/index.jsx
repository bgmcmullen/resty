import React from 'react';

import './History.scss';

function History(props) {
  const { historyArray, restoreHistory } = props;

  function selectMethodColor(method){
    if(method === 'get') {
      return 'lightblue';
    }
    if(method === 'post') {
      return 'green';
    }
    if(method === 'put') {
      return 'yellow';
    }
    if(method === 'delete') {
      return 'red';
    }
  }

  function handleClickHistory(e) {
    const index = e.currentTarget.getAttribute('data-index');
    restoreHistory(index);

  }


  return (
    <>
      <div className="sidebar">
        <h3>Restore History</h3>
          {historyArray ? (
            <ul>
                {historyArray.map((history, index) => (
                  <div className="history-container" key={index + 'div'} data-index={index}  onClick={handleClickHistory}>
                    <p className='method' key={index} style={{background: selectMethodColor(history.requestParams.method)}}>{history.requestParams.method.toUpperCase()}</p><p className='url' key={index + 'url'}>{history.requestParams.url}</p>
                  </div>
                ))
              }
            </ul>
          ) : null}
                <button className="clear-button" onClick={props.clearHistory}>Clear History</button>
      </div>

    </>
  );
}

export default History;