import Snow from './snow.jsx';
import Rain from './rain.jsx';
import Fog from './fog.jsx';
import Hearts from './hearts.jsx';
import '../components/weather-menu.css';
import '../App.css';
import PropTypes from 'prop-types';

const Weather = ({ weather, day }) => {
  
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
    weather: PropTypes.string,
    day: PropTypes.bool
  };
  
  export default Weather;