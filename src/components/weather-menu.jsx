import clouds from '../assets/weather/clouds.svg';
import fog from '../assets/weather/fog.svg';
import hearts from '../assets/weather/hearts.svg';
import './weather-menu.css';
import '../App.css';
import PropTypes from 'prop-types';

const blockImages = [
  { name: 'fog', src: fog, className: 'fog' },
  { name: 'clouds', src: clouds, className: 'clouds' },
  { name: 'hearts', src: hearts, className: 'hearts' }
];

const WeatherMenu = ({ onWeatherChange }) => {
  
  const weatherChange = (weather) => {
      onWeatherChange(weather);
      setTimeout(() => {
        onWeatherChange(null);
      }, 60000); 
  }
  
  return (
    <div className="block-container">
      {blockImages.map((img, index) => (
        <img
          src={img.src}
          key={index}
          alt={img.name}
          className={`block ${img.className}`}
          onClick={() => weatherChange(img.name)}
        />
      ))}
    </div>
  );
};

WeatherMenu.propTypes = {
  onWeatherChange: PropTypes.func,
};

export default WeatherMenu;
