import React from 'react';

import './Results.scss';

function Results(props) {
  return (
    <>
      <section>
        <h2>{props.data ? 'Count: '+ props.data.count : null}</h2>
      </section>
      <section>
      {props.data ? 
        (<ul>
          {props.data.results.map((result, index) => {
            return (<li key={index}>{JSON.stringify(result)}</li>)
          })
        }

        </ul>)  : null}
      </section>
    </>
  );
}

export default Results;
