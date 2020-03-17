/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => {
  return (
    <h2>{text}</h2>
  );
};


const ButtonGroup = ({controls, values}) => {
  return (
    <div>
      <button onClick={() => controls.setGood(values.good + 1)}>Good</button>
      <button onClick={() => controls.setNeutral(values.neutral + 1)}>Neutral</button>
      <button onClick={() => controls.setBad(values.bad + 1)}>Bad</button>
    </div>
  );
};

const Statistics = ({ values }) => {
  return (
    <div>
      <p>Good {values.good}</p>
      <p>Neutral {values.neutral}</p>
      <p>Bad {values.bad}</p>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const values = { good, neutral, bad };
  const controls = { setGood, setNeutral, setBad };
  return (
    <div>
      <Header text="Give Feedback" />
      <ButtonGroup controls={controls} values={values} />
      <Header text="Statistics" />
      <Statistics values={values} />
    </div>
  );
};

ReactDOM.render(<App />,
  document.getElementById('root'));
