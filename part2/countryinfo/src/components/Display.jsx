import Country from './Country'

const Display = ({ filteredCountries, handleShow}) => {
    if (filteredCountries.length > 9) {
      return (<p>Too many matches, specify another filter</p>)
    }
    else if (filteredCountries.length < 9 && filteredCountries.length > 1){
      return (
        <div>
          <ul>
            {filteredCountries.map(x => 
                <Country key={x.name.common} country={x} isHidden={true} handleShow={handleShow} />
            )}
          </ul>
        </div>
      )
    }
    else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return (
        <>
            <Country country={country} isHidden={false} handleShow={handleShow}/>
        </>
      )
    }
  }

  export default Display;