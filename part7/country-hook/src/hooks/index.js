import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

  useEffect(() => {
    if (name) {
      axios
        .get(`${baseUrl}/${name}`)
        .then((res) => {
          const tmpData = {
            name: res.data.name.common,
            capital: res.data.capital,
            population: res.data.population,
            flag: res.data.flags.png,
          };
          setCountry({ data: tmpData, found: true });
        })
        .catch(setCountry(null));
    }
  }, [name]);

  if (name === "") {
    return null;
  }

  if (!country) {
    return null;
  }

  return country;
};
