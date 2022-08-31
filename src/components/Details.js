import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; //eslint-disable-line
import { fetchAirData, fetchWeatherData } from '../redux/action-reducer';
import { baseImageUrl, imageExtension } from '../api/api';

const Details = () => {
  const countries = useSelector((state) => state.countries);
  const airPollution = useSelector((state) => state.air);
  const weather = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const { countryname } = useParams();

  useEffect(() => {
    countries.forEach((country) => {
      if (country.name.common === countryname) {
        dispatch(fetchAirData(country.latlng[0], country.latlng[1]));
        dispatch(fetchWeatherData(country.latlng[0], country.latlng[1]));
      }
    });
  }, []);

  return (
    <section className="details-section">
      <h2>{countryname}</h2>
      {weather.map((item) => (
        <figure key={item.id}>
          <img src={baseImageUrl + item.icon + imageExtension} alt="weather icon" />
          <figcaption>{item.description}</figcaption>
        </figure>
      ))}
      {Object.values(airPollution).map((item) => (
        <div key={item.dt} className="pollution-data">

          <Pie
            type="pie"
            data={
            {
              labels: ['CO', 'NO', 'NO2', 'O3', 'SO2', 'NH3', 'PM2.5', 'PM10'],
              datasets: [
                {
                  data: [item.components.co, item.components.no, item.components.no2,
                    item.components.o3, item.components.so2, item.components.nh3,
                    item.components.pm2_5, item.components.pm10],
                  label: 'Concentration of pollutant gases, μg/m3',
                  backgroundColor: ['red', 'blue', 'green', 'orange',
                    'yellow', 'purple', 'pink', 'brown'],
                },
              ],
            }
          }
          />
          <p className="aqi-detail">
            AQI(Air Quality Index):
            {item.main.aqi}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Details;
