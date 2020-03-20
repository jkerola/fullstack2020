/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// from https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus#tehtavat-1-6-1-14
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

const initialList = new Array(anecdotes.length).fill(0);
let listPointer = initialList;
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
  const [votes, setVotes] = useState(0);
  const voteQuote = () => {
    const copy = [...listPointer];
    copy[selected] += 1;
    listPointer = copy;
    const mostVotes = Math.max(...listPointer);
    return setVotes(mostVotes);
  };
  return (
    <div>
      <Header text="Inspirational Quote" />
      <p>&quot;{anecdotes[selected]}&quot;</p>
      <button onClick={voteQuote}>Like</button>
      <button onClick={() => setSelected(random())}>Next Quote</button>
      <Popular votes={votes} />
    </div>
  );
};
const Popular = ({ votes }) => {
  const index = listPointer.indexOf(votes);
  return (
    <div>
      <h3>Most Popular Quote</h3>
      &quot;{anecdotes[index]}&quot;
      <br /> With {votes} votes.
    </div>
  );
};
const App = () => {
  // from https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus
  const [selected, setSelected] = useState(0);
  const quoteControls = { setSelected, selected };
  return (
    <div>
      <Quote quoteControls={quoteControls} />
    </div>
  );
};

ReactDOM.render(<App />,
  document.getElementById('root'));
