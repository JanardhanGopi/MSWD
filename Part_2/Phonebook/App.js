import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterStr, setFilterStr ] = useState('')
  const matchPersons = 
    persons.filter(p => p.name.toUpperCase().includes(filterStr.toUpperCase()))
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ notificationFlag, setNotificationFlag] = useState('success')

  useEffect(() => {
    console.log('effect')
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const validateUniqName = (newPerson) => {
    const isUniqName = !persons.some(p => p.name === newName) 

    if (isUniqName) return true

    const existedPerson = persons.filter(p => p.name === newName);
    const { id, name } = existedPerson[0];

    const isReplace = window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`);

    if (isReplace) {
      phonebookService
        .update(id, newPerson)
        .then(returnedPerson => {
          setNotificationMessage(`${newName} number is updated`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000)
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        })
        .catch(error => {
          setNotificationFlag('error');
          // setNotificationMessage(`information of ${newName} has already been removed from the server`);
          setNotificationMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setNotificationMessage(null);
            setNotificationFlag('success');
          }, 5000);
          // setPersons(persons.filter(p => p.id !== id));
        })
    }

    return false
  }

  const filterData = (e) => {
    setFilterStr(e.target.value)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if ( !validateUniqName(newPerson) ) return
    
    phonebookService
      .create(newPerson)
      .then(returnedPerson => {
        setNotificationMessage(`added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedPerson))
      })
      .catch(error => {
        setNotificationFlag('error');
        setNotificationMessage(`${error.response.data.error}`);
        setTimeout(() => {
          setNotificationFlag('success');
          setNotificationMessage(null);
        }, 5000);
      })

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const deletedPerson = persons.filter(p => p.id === id);
    const isDelete = window.confirm(`delete ${deletedPerson[0].name}?`);

    if ( isDelete ) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setNotificationMessage(`deleted ${deletedPerson[0].name}`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          setNotificationFlag('error');
          setNotificationMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setNotificationFlag('success');
            setNotificationMessage(null);
          }, 5000);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} flag={notificationFlag} />
      <Filter filterStr={filterStr} filterData={filterData}/>
      <h3>Add a new</h3>
      
      <PersonForm 
        handleSubmitForm={handleSubmitForm} 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
      />
      <h3>Numbers</h3>
      <Persons matchPersons={matchPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App