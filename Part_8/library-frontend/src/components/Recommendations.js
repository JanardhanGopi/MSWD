import React, {useState, useEffect} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = ({show}) => {
  const [user, setUser] = useState(null)
  const [books, setBooks] = useState([])
  const meResult = useQuery(ME)
  const [allBooks, booksResult] = useLazyQuery(ALL_BOOKS)


  useEffect(() => {
    if ( meResult.data && meResult.data.me ) {
      setUser({...meResult.data.me})
      allBooks({ variables: { genre: meResult.data.me.favoriteGenre } })
    }
  }, [meResult.data]) // eslint-disable-line

  useEffect(() => {
    if ( booksResult.data ) {
      setBooks([...booksResult.data.allBooks])
    }
  }, [booksResult.data]) // eslint-disable-line
  
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>books in your favorite genre <b>{user && user.favoriteGenre}</b></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
