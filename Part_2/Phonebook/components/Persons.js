import React from 'react'
import Person from './Person'

const Persons = ({matchPersons, deletePerson}) => {
  return (
    <ul>
      {matchPersons.map((p) => 
        <Person 
          key={p.name} 
          name={p.name} 
          number={p.number} 
          deletePerson={() => deletePerson(p.id)}
        />
      )}
    </ul>
  )
}

export default Persons;