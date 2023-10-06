const Country = ({ country, isHidden, handleShow }) => {
    if (isHidden) {
        return (
            <>
                <li>{country.name.common} <button onClick={() => handleShow(country)}>show</button></li>
            </>
        )
    }
    else {
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

export default Country;