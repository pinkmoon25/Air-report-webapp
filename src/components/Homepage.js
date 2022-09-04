import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';
import { fetchCountries } from '../redux/action-reducer';
import { countryMap } from '../api/api';
import Modal from './Modal';
import asiaMap from '../images/asia.png';
import africMap from '../images/africa.svg';
import antarcticMap from '../images/antarctica.svg';
import europeMap from '../images/europe.svg';
import northAmericaMap from '../images/north-america.svg';
import oceaniaMap from '../images/oceania.svg';
import southAmericaMap from '../images/south-america.svg';

const Homepage = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const [region, setRegion] = useState('Asia');

  const handleChange = (e) => {
    setRegion(e.target.value);
    dispatch(fetchCountries(e.target.value));
  };

  const continentMap = (continent) => {
    switch (continent) {
      case 'Asia':
        return (<img src={asiaMap} alt="asia map" className="map-img" />);
      case 'Europe':
        return (<img src={europeMap} alt="asia map" className="map-img" />);
      case 'Africa':
        return (<img src={africMap} alt="asia map" className="map-img" />);
      case 'North America':
        return (<img src={northAmericaMap} alt="asia map" className="map-img" />);
      case 'South America':
        return (<img src={southAmericaMap} alt="asia map" className="map-img" />);
      case 'Antarctic':
        return (<img src={antarcticMap} alt="asia map" className="map-img" />);
      case 'Oceania':
        return (<img src={oceaniaMap} alt="asia map" className="map-img" />);
      default:
        return 'Map loading...';
    }
  };

  useEffect(() => {
    if (!countries.length) {
      dispatch(fetchCountries(region));
    }
  }, []);

  const renderCountries = () => (
    <ul className="country-list">
      {countries.map((country) => (
        <li key={country.ccn3} className="country">
          <div className="country-flag">
            <img src={country.flags.svg} className="flags-img" alt="country flag" />
            <Link to={`/details/${country.name.common}`} className="details-link">
              <FaArrowCircleRight />
            </Link>
          </div>
          <img
            src={`${countryMap}${country.cca2.toLowerCase()}/vector.svg`}
            className="country-map"
            alt="country map"
          />
          <div className="country-details">
            <h3>{country.name.common}</h3>
            <p>
              Capital:&nbsp;
              {country.capital}
            </p>
            <p>
              Population:&nbsp;
              {country.population}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="homepage">
      <div className="select-region">
        <span>Select a Region: </span>
        <select id="region" value={region} onChange={(e) => handleChange(e)}>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <Modal />
      <div className="continent">
        <h2>
          {countries[0]?.continents[0] || ''}
          (
          {countries.length}
          {' '}
          countries)
        </h2>
        {continentMap(countries[0]?.continents[0])}
      </div>
      {renderCountries()}
    </section>
  );
};

export default Homepage;
