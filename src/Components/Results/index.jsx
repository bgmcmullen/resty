import React from 'react';
import './Results.scss';

function Results(props) {
  return (
    <section className="results">
      <p className='results-title'>Response:</p>
      <section>
        <p className>{props.data ? (props.data.count ? 'Count: ' + props.data.count : null) : null}</p>
      </section>
      <section>
        {props.data ? (
          <ul>
            {Array.isArray(props.data.results) ? (
              props.data.results.map((result, index) => (
                <li key={index}>{JSON.stringify(result)}</li>
              ))
            ) : (
              <li className='results'>{JSON.stringify(props.data.results)}</li>
            )}
          </ul>
        ) : null}
      </section>
    </section>
  );
}

export default Results;
