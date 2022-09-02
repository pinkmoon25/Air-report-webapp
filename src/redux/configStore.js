import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { countriesReducer, weatherReducer, airReducer } from './action-reducer';

const rootReducer = combineReducers({
  countries: countriesReducer,
  air: airReducer,
  weather: weatherReducer,
});

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunkMiddleware));

export default store;
