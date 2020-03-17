import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Total = (props) => {
  return (
    <div>
      Number of exercises {props.total}
    </div>
  );
};

const Content = (props) => {
  console.log(props);
  
  return (
    <div>
      <Part part={props.parts.part1.name} exercise={props.parts.part1.exercises} />
      <Part part={props.parts.part2.name} exercise={props.parts.part2.exercises} />
      <Part part={props.parts.part3.name} exercise={props.parts.part3.exercises} />
    </div>
  );
};

const App = () => {
  // From example at https://fullstackopen.com/osa1/reactin_alkeet
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };
  // end example
  const total = part1.exercises + part2.exercises + part3.exercises;
  const parts = { part1, part2, part3 };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}  />
      <Total total={total} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
