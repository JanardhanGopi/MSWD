  
import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select';

const Authors = (props) => {
  let authors = []
  const result = useQuery(ALL_AUTHORS) 
  const [selectedOption, setSelectedOption] = useState(null);
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (result.data && result.data.allAuthors) {
    authors = [...result.data.allAuthors]
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    editAuthor({  variables: { name: selectedOption.value, setBornTo: Number(born) } })
    setSelectedOption(null)
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (authors.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={authors.map(a => ({value: a.name, label: a.name}))}
        />
        <div>
          <span>born</span><input value={born} onChange={({target}) => setBorn(target.value)} type="text"/>
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors
