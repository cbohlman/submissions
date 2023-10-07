import { useState, useEffect } from "react";
import weatherService from '../services/weather'

const Country = ({ country, isHidden, handleShow }) => {
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        if (isHidden) {
            return;
        }
        else {
            weatherService.getWeather(country.capital)
            .then(res => {
                setWeather(res)
                console.log(res)
            })
            .catch(err => console.error(err))
        }
    }, [country.capital, isHidden])
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
            <div>
                <h2>Weather in {country.capital}</h2>
                {weather !== null &&
                <>
                    <p>Temperature: {weather.main.temp} degrees C</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <p>Wind: {weather.wind.speed} m/s</p>
                </>
                }
            </div>
            </>
        )
    }
}

export default Country; 