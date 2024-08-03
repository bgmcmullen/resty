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
        <p className='history-title'>Restore History</p>
          {historyArray ? (
            <ul>
                {historyArray.map((history, index) => (
                  <li className="history-container" key={index + 'li'} data-index={index}  onClick={handleClickHistory}>
                    <p className='method' key={index} style={{background: selectMethodColor(history.requestParams.method)}}>{history.requestParams.method.toUpperCase()}</p><p className='url' key={index + 'url'}>{history.requestParams.url}</p>
                  </li>
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