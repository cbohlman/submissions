import axios from "axios";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const getWeather = (city) => {
  const url = `${BASE_URL}${city}&appid=${API_KEY}`;
  console.log(url);
  return axios.get(url).then((res) => res.data);
};

export default { getWeather };
