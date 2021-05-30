import React from 'react'

const Total = ({parts}) => {
  const sumOfExercises = parts.reduce((sum, part) => sum += part.exercises, 0);

  return (
    <p><b>Total of exercises {sumOfExercises}</b></p>
  )
}

export default Total;