import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import store from '../redux/configStore';
import Homepage from '../components/Homepage';
import Details from '../components/Details';
import Header from '../components/Header';
import { weatherReducer, airReducer, countriesReducer } from '../redux/action-reducer';

describe('weather reducer test', () => {
  test('reducer has default state', () => {
    const result = weatherReducer(undefined, { type: undefined });
    expect(result).toEqual([]);
  });

  test('fetch weather data should return payload data', () => {
    const action = {
      type: 'FETCH_WEATHER_REPORT',
      payload: 'payload data',
    };
    const result = () => weatherReducer(undefined, action);
    expect(result()).toEqual('payload data');
  });
});

describe('Air reducer test', () => {
  test('reducer has default state', () => {
    const result = airReducer(undefined, { type: undefined });
    expect(result).toEqual([]);
  });

  test('fetch air data should return payload data', () => {
    const action = {
      type: 'FETCH_AIR_REPORT',
      payload: 'payload data',
    };
    const result = () => airReducer(undefined, action);
    expect(result()).toEqual('payload data');
  });
});

describe('Countries reducer test', () => {
  test('reducer has default state', () => {
    const result = countriesReducer(undefined, { type: undefined });
    expect(result).toEqual([]);
  });

  test('fetch countries data should return payload data', () => {
    const action = {
      type: 'FETCH_COUNTRIES',
      payload: 'payload data',
    };
    const result = () => countriesReducer(undefined, action);
    expect(result()).toEqual('payload data');
  });
});

describe('test components', () => {
  test('Homepage should render on the screen', () => {
    render(
      <Provider store={store}>
        <Homepage />
      </Provider>,
    );
    const homePage = screen.getByRole('list');
    expect(homePage).toBeInTheDocument();
  });

  test('Details should render on the screen', () => {
    render(
      <Provider store={store}>
        <Details />
      </Provider>,
    );
    const detailsPage = screen.getByRole('heading');
    expect(detailsPage).toBeInTheDocument();
  });

  test('Header should render on screen', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});
