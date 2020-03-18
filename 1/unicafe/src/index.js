/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

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
const Quote = ({quoteControls}) => {
  const { selected, setSelected } = quoteControls;
  const random = () => {
    let index = selected;
    // while loop prevents duplicates in a row
    while (selected === index) {
      index = Math.floor(Math.random() * anecdotes.length);
    }
    return index;
  };
  return (
    <div>
      <Header text="Inspirational Quote" />
      <p>&quot;{anecdotes[selected]}&quot;</p>
      <button>Like</button>
      <button onClick={() => setSelected(random())}>Next Quote</button>
    </div>
  );
};
const App = () => {
  // from https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus
  // tallenna napit omaan tilaansa
  const likes = new Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const quoteControls = { setSelected, selected, likes };
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
        <Quote quoteControls={quoteControls} />
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
