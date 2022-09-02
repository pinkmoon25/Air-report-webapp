import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; //eslint-disable-line
import { fetchAirData, fetchWeatherData } from '../redux/action-reducer';
import { baseImageUrl, imageExtension, countryMap } from '../api/api';

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

  const rating = (n) => {
    switch (n) {
      case 1:
        return (<span style={{ color: '#008000' }}>Good</span>);
      case 2:
        return (<span style={{ color: '#ffff00' }}>Fair</span>);
      case 3:
        return (<span style={{ color: '#ffa500' }}>Moderate</span>);
      case 4:
        return (<span style={{ color: '#ff0000' }}>Poor</span>);
      case 5:
        return (<span style={{ color: '#ff0000' }}>Very Poor</span>);
      default:
        return 'not available';
    }
  };

  const renderPollutionData = (data) => {
    if (data.length) {
      return (
        Object.values(airPollution).map((item) => (
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
              backgroundColor: ['red', 'blue', 'green', 'orange',
                'yellow', 'purple', 'pink', 'brown'],
            },
          ],
        }
        }
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 700,
                    },
                  },
                  title: {
                    display: true,
                    text: 'Air pollution Data',
                    color: '#fff',
                  },
                },
              }}
            />
            <p className="aqi-detail">
              AQI(Air Quality Index):&nbsp;
              {rating(item.main.aqi)}
            </p>
          </div>
        ))
      );
    }
    return (
      <div className="pollution-data">
        <Pie
          type="pie"
          data={
      {
        labels: ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'],
        datasets: [
          {
            data: [12, 12, 12, 12, 12, 12, 12, 12],
            backgroundColor: ['red', 'blue', 'green', 'orange',
              'yellow', 'purple', 'pink', 'brown'],
          },
        ],
      }
      }
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: '#fff',
                  fontSize: 18,
                },
              },
              title: {
                display: true,
                text: 'loading data from the server...',
                color: '#fff',
              },
            },
          }}
        />
      </div>
    );
  };

  return (
    <div className="container">
      <h2>{countryname}</h2>
      <section className="details-section">
        {countries.map((country) => {
          if (country.name.common === countryname) {
            const countryCode = country.cca2.toLowerCase();
            return (
              <img
                key={countryCode}
                src={`${countryMap}${countryCode}/vector.svg`}
                className="country-map"
                alt="country map"
              />
            );
          }
          return null;
        })}
        <div className="data">
          {weather.map((item) => (
            <figure key={item.id}>
              <img src={baseImageUrl + item.icon + imageExtension} alt="weather icon" />
              <figcaption>{item.description}</figcaption>
            </figure>
          ))}
          {renderPollutionData(airPollution)}
        </div>
      </section>
    </div>
  );
};

export default Details;
