import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS) 
  const [filteredBooks, setFilteredBooks] = useState([])

  const handleFilterBooks = (genre) => {
    if ( genre === 'all' ) {
      setFilteredBooks([...result.data.allBooks])
      return
    }
    setFilteredBooks(result.data.allBooks.filter(b => b.genres.includes(genre)))
  }

  useEffect(() => {
    if ( result.data ) {
      setFilteredBooks([...result.data.allBooks])
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <button onClick={() => handleFilterBooks('crime')}>crime</button>
        <button onClick={() => handleFilterBooks('refactoring')}>refactoring</button>
        <button onClick={() => handleFilterBooks('code')}>code</button>
        <button onClick={() => handleFilterBooks('all')}>all</button>
      </div>
    </div>
  )
}

export default Books