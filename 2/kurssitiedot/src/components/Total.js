import React from 'react'

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((total, next) => total + next)
  return (
    <b>total of {total} exercises</b>
  )
}

export default Total