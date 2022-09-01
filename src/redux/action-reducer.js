import {
  countryBaseUrl, airPollutionUrl, weatherUrl, appId,
} from '../api/api';

const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
const FETCH_AIR_REPORT = 'FETCH_AIR_REPORT';
const FETCH_WEATHER_REPORT = 'FETCH_WEATHER_REPORT';

const fetchCountries = (region) => async (dispatch) => {
  try {
    const res = await fetch(countryBaseUrl + region);
    const countries = await res.json();
    dispatch({ type: FETCH_COUNTRIES, payload: countries });
  } catch (error) {
    console.log(error);
  }
};

const countriesReducer = (state = [], action) => {
  if (action.type === FETCH_COUNTRIES) return action.payload;
  return state;
};

const fetchAirData = (lat, lon) => async (dispatch) => {
  try {
    const url = encodeURI(`${airPollutionUrl}lat=${lat}&lon=${lon}&appid=${appId}`);
    const res = await fetch(url);
    const data = await res.json();
    dispatch({ type: FETCH_AIR_REPORT, payload: data.list });
  } catch (error) {
    console.error(error);
  }
};

const fetchWeatherData = (lat, lon) => async (dispatch) => {
  try {
    const url = encodeURI(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${appId}`);
    const res = await fetch(url);
    const data = await res.json();
    dispatch({ type: FETCH_WEATHER_REPORT, payload: data.weather });
  } catch (error) {
    console.error(error);
  }
};

const airReducer = (state = [], action) => {
  if (action.type === FETCH_AIR_REPORT) return action.payload;
  return state;
};

const weatherReducer = (state = [], action) => {
  if (action.type === FETCH_WEATHER_REPORT) return action.payload;
  return state;
};

export {
  countriesReducer, fetchCountries, fetchAirData, airReducer, fetchWeatherData, weatherReducer,
};
