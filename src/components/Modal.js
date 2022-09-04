import ReactModal from 'react-modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; //eslint-disable-line
import { fetchAirData, fetchWeatherData } from '../redux/action-reducer';
import { baseImageUrl, imageExtension } from '../api/api';

const Modal = () => {
  const [open, setIsOpen] = useState(false);
  const airPollution = useSelector(((state) => state.air));
  const weather = useSelector(((state) => state.weather));
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsOpen(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        dispatch(fetchAirData(latitude, longitude));
        dispatch(fetchWeatherData(latitude, longitude));
      });
    } else console.log('location access failed');
  };

  const rating = (n) => {
    switch (n) {
      case 1:
        return (<span style={{ color: '#7cfc00' }}>Good</span>);
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
    <div>
      <button type="button" onClick={() => handleClick()}>
        current location data
      </button>
      <ReactModal isOpen={open} appElement={document.getElementById('root') || undefined}>
        <h2>{weather.name ? weather.name : ''}</h2>
        <div className="data">
          {weather.weather?.map((item) => (
            <figure key={item.id}>
              <img src={baseImageUrl + item.icon + imageExtension} alt="weather icon" />
              <figcaption>{item.description}</figcaption>
            </figure>
          ))}
          <ul className="weather-data">
            <li>
              Temperature:
              {' '}
              {weather.main?.temp}
              &#8451;
            </li>
            <li>
              Feels Like:
              {' '}
              {weather.main?.feels_like}
              &#8451;
            </li>
            <li>
              Atmospheric pressure:
              {' '}
              {weather.main?.pressure}
              {' '}
              hPa
            </li>
            <li>
              Humidity:
              {' '}
              {weather.main?.humidity}
              &#65285;
            </li>
            <li>
              Minimum temperature:
              {' '}
              {weather.main?.temp_min}
              &#8451;
            </li>
            <li>
              Maximum temperature:
              {' '}
              {weather.main?.temp_max}
              &#8451;
            </li>
            <li>
              Wind speed:
              {' '}
              {weather.wind?.speed}
              {' '}
              meter/sec
            </li>
          </ul>
        </div>
        {renderPollutionData(airPollution)}
        <button type="button" onClick={() => setIsOpen(false)}>close</button>
      </ReactModal>
    </div>

  );
};

export default Modal;
