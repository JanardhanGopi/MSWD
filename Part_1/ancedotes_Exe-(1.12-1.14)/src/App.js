import React, { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [anecdotesRating, setAnecdotesRating] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const indexOfTheAnecdoteWithBiggestRating = anecdotesRating.indexOf( Math.max(...anecdotesRating) );

  function handleAnecdoteRating() {
    setAnecdotesRating([
      ...anecdotesRating.slice(0, selected),
      anecdotesRating[selected] + 1,
      ...anecdotesRating.slice(selected + 1),
    ])
  }
  
  console.log(anecdotesRating)
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {anecdotesRating[selected]} votes</div>
      <br/>
      <button onClick={ handleAnecdoteRating }>vote</button>
      <button onClick={() => setSelected(getRandomInt( anecdotes.length )) }>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[indexOfTheAnecdoteWithBiggestRating]}</div>
    </div>
  )
}



export default App;