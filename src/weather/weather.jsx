import Snow from './snow.jsx';
import Rain from './rain.jsx';
import Fog from './fog.jsx';
import Hearts from './hearts.jsx';
import '../components/weather-menu.css';
import '../App.css';
import PropTypes from 'prop-types';

const Weather = ({ weatherState }) => {
    const { weather, day } = weatherState || {};
  
    if (!weather) {
      return null;
    }
  
    if (weather === 'clouds') {
      if (day) {
        return <Rain />;
      } else {
        return <Snow />;
      }
    } else if (weather === 'fog') {
      return <Fog />;
    } else if (weather === 'hearts') {
      return <Hearts />;
    } else {
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