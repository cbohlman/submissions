const Display = ({ filteredCountries}) => {
    if (filteredCountries.length > 9) {
      return (<p>Too many matches, specify another filter</p>)
    }
    else if (filteredCountries.length < 9 && filteredCountries.length > 1){
      return (
        <div>
          <ul>
            {filteredCountries.map(x => <li key={x.name.common}>{x.name.common}</li>)}
          </ul>
        </div>
      )
    }
    else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return (
        <>
          <h2>{country.name.common}</h2>
          <div>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
          </div>
          <div>
            <h3>Languages:</h3>
            <ul>
              {Object.values(country.languages).map(x => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div>
            <img style={{maxWidth: '450px', maxHeight:'450px'}}src={country.flags.svg} alt={country.flags.alt} />
          </div>
        </>
      )
    }
  }

  export default Display;