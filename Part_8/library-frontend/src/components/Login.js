import React, {useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({show, setToken, setPage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    // onError: (error) => {
    //   setError(error.graphQLErrors[0].message)
    // }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      setPage('authors')
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const handleSubmit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>username</span><input value={username} onChange={({target}) => setUsername(target.value)} type="text"/>
      </div>
      <div>
        <span>password</span><input value={password} onChange={({target}) => setPassword(target.value)} type="password"/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
