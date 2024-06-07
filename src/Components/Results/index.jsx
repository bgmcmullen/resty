import React from 'react';
import './Results.scss';

function Results(props) {
  return (
    <section className="results">
      <h2>Response:</h2>
      <section>
        <h2>{props.data ? (props.data.count ? 'Count: ' + props.data.count : null) : null}</h2>
      </section>
      <section>
        {props.data ? (
          <ul>
            {Array.isArray(props.data.results) ? (
              props.data.results.map((result, index) => (
                <li key={index}>{JSON.stringify(result)}</li>
              ))
            ) : (
              <li>{JSON.stringify(props.data.results)}</li>
            )}
          </ul>
        ) : null}
      </section>
    </section>
  );
}

export default Results;
