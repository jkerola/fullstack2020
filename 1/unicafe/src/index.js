/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => {
  return (
    <h2>{text}</h2>
  );
};

const ButtonGroup = ({ controls, values }) => {
  return (
    <div>
      <Button text="Good" incrementValue={() => controls.setGood(values.good + 1)} />
      <Button text="Neutral" incrementValue={() => controls.setNeutral(values.neutral + 1)} />
      <Button text="Bad" incrementValue={() => controls.setBad(values.bad + 1)} />
    </div>
  );
};

const Button = ({text, incrementValue}) => {
  return (
    <button onClick={incrementValue}>{text}</button>
  );
};

const StatisticLine = ({text, value, sign}) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value} {sign}
      </td>
    </tr>
  );
};

const Statistics = ({ values }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={values.good} />
        <StatisticLine text="Neutral" value={values.neutral} />
        <StatisticLine text="Bad" value={values.bad} />
        <StatisticLine text="Average" value={values.average} />
        <StatisticLine text="Positive" value={values.positive} sign="%" />
      </tbody>
    </table>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const controls = { setGood, setNeutral, setBad };
  const total = good + bad + neutral;
  const average = (good - bad) / total || 0;
  const positive = (good / total) * 100 || 0;
  const values = {
    good,
    neutral,
    bad,
    total,
    average,
    positive,
  };
  if (total === 0) {
    return (
      <div>
        <Header text="Give Feedback" />
        <ButtonGroup controls={controls} values={values} />
        <Header text="Statistics" />
        <p>No feedback given.</p>
      </div>
    );
  }
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
