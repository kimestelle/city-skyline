import {useEffect} from 'react';
import Snow from './snow.jsx';
import Rain from './rain.jsx';
import Fog from './fog.jsx';
import Hearts from './hearts.jsx';
import '../components/weather-menu.css';
import '../App.css';
import PropTypes from 'prop-types';

const Weather = ({ weatherState }) => {
    const { weather, day } = weatherState || {};

    useEffect(() => {
      console.log("Weather updated:", weatherState);
    }, [weatherState]);
  
    if (!weather) {
      return null;
    }
  
    switch (weather) {
      case 'clouds':
        return day ? <Rain /> : <Snow />;
      case 'fog':
        return <Fog />;
      case 'hearts':
        return <Hearts />;
      default:
        return null;
    }
  };
  
  Weather.propTypes = {
    weatherState: PropTypes.shape({
      weather: PropTypes.string,
      day: PropTypes.bool.isRequired,
    }),
  };
  
  export default Weather;