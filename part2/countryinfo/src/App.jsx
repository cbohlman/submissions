import { useEffect, useState } from 'react'
import countryService from './services/countries'
import Display from './components/Display'

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filteredRes, setFilteredRes] = useState([])

  useEffect(() => {
    countryService
    .getAll()
    .then(res => {
      setCountries(res)
    })
  }, [])


  const handleInputChange = (event) => {
    const val = event.target.value;
    setSearchValue(val)
    const filteredResults = countries.filter(x => x.name.common.toLowerCase().includes(val.toLowerCase()))
    setFilteredRes(filteredResults)
  }

  const handleShow = country => {
    setFilteredRes([country])
  }

  return (
    <div>
      <form>
        find countries <input value={searchValue} onChange={handleInputChange}></input>
      </form>
      <Display countries={countries} filteredCountries={filteredRes} handleShow={handleShow}/>
    </div>
  )
}

export default App
