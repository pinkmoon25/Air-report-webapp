import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../redux/action-reducer';

const Homepage = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const [region, setRegion] = useState('Asia');

  const handleChange = (e) => {
    setRegion(e.target.value);
    dispatch(fetchCountries(e.target.value));
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
    <>
      <div>
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
      {renderCountries()}
    </>
  );
};

export default Homepage;
