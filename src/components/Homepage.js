import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../redux/action-reducer';
import asiaMap from '../images/Asia.png';
import africMap from '../images/africa.jpg';
import antarcticMap from '../images/antarctic.jpg';
import europeMap from '../images/europe.png';
import northAmericaMap from '../images/north-america.jpg';
import oceaniaMap from '../images/oceania.jpg';
import southAmericaMap from '../images/south_america.jpg';

const Homepage = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const [region, setRegion] = useState('Asia');

  const handleChange = (e) => {
    setRegion(e.target.value);
    dispatch(fetchCountries(e.target.value));
  };

  const continentMap = () => {
    switch (region) {
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
    dispatch(fetchCountries(region));
  }, []);

  const renderCountries = () => (
    <ul>
      {countries.map((country) => (
        <li key={country.ccn3}>
          <p>{country.name.common}</p>
          <img src={country.flags.svg} className="flags-img" alt="country flag" />
          <p>
            Capital:
            {country.capital}
          </p>
          <p>
            Population:
            {country.population}
          </p>
          <Link to={`/details/${country.name.common}`}>Air report</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="homepage">
      <div className="select-region">
        <span>select a region: </span>
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
      <div className="continent">
        <h2>{region}</h2>
        {continentMap()}
      </div>
      {renderCountries()}
    </section>
  );
};

export default Homepage;
