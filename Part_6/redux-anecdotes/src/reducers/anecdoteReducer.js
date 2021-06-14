import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data

    case 'NEW_ANECDOTE':
      return [
        ...state,
        action.data
      ]

    case 'VOTE':
      const changedAnecdoteIndex = state.findIndex(a => a.id === action.data.id)

      return [
        ...state.slice(0, changedAnecdoteIndex),
        action.data,
        ...state.slice(changedAnecdoteIndex + 1),
      ]

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const updatedAnecdote = getState().anecdotes.find(a => a.id === id)
    const votedAnecdote = {...updatedAnecdote, votes: updatedAnecdote.votes + 1}
    const response = await anecdoteService.updateAnecdote(id, votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: response
    })
  }
}

export default reducer