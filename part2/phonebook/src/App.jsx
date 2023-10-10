import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notifMessage, setNotifMessage] = useState('')
  const [notifType, setNotifType] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addName = (event) => {
    event.preventDefault();
    if (persons.filter(person => person.name === newName).length > 0) {
      if(window.confirm(`${newName} is already in the phonebook, would you like to replace the number?`)) {
        const oldPerson = persons.find(p => p.name === newName);
        const newPerson = { ...oldPerson, number: newNumber }
        personService
        .update(oldPerson.id, newPerson)
        .then(res => {
          setPersons(persons.map(p => p.id !== oldPerson.id ? p : res))
          setNotifMessage(`Successfully updated number for ${newPerson.name}`)
          setNotifType('success')
          setTimeout(() => {
            setNotifMessage(null)
            setNotifType(null)
          }, 5000)
        })
      }
    }
    else {
      personService
      .create({ name: newName, number: newNumber, id: persons.length + 1 })
      .then(res => {
        setPersons(persons.concat(res));
        setNotifMessage(`Successfully added ${newName}`)
        setNotifType('success')
        setTimeout(() => {
          setNotifMessage(null)
          setNotifType(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data.error);
        setNotifMessage(error.response.data.error)
        setNotifType('error')
        setTimeout(() => {
          setNotifMessage(null)
          setNotifType(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm('Do you really want to delete?')) {
      personService
      .deletePerson(id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(err => {
        console.error(err);
        const per = persons.find(p => p.id === id)
        setNotifMessage(`Error deleting ${per.name}, likely already deleted`)
        setNotifType('error')
        setTimeout(() => {
          setNotifMessage(null)
          setNotifType(null)
        }, 5000)
      })
    }
  }

  const peopleToShow = filterValue === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} type={notifType} />
      <Filter filterChangeHandler={handleFilterChange} />
      <h3>Add a New Value</h3>
      <PersonForm 
        submitHandler={addName} 
        nameValue={newName}
        nameChangeHandler={handleNameChange}
        numberValue={newNumber}
        numberChangeHandler={handleNumberChange}>
      </PersonForm>
      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow} deleteHandler={handleDelete}/>
    </div>
  )
}

export default App