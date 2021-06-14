import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

const AnecdoteForm = ({createAnecdote, setNotificationMessage}) => {
  const handleCreateAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    createAnecdote(content)
    setNotificationMessage(`anecdote '${content}' created`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default connect(null, {createAnecdote, setNotificationMessage})(AnecdoteForm)
