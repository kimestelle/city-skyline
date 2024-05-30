import clouds from "../assets/weather/clouds.svg";
import fog from "../assets/weather/fog.svg";
import hearts from "../assets/weather/hearts.svg";
import './weather-menu.css';
import '../App.css';

const blockImages = [
  { name: 'fog', src: fog, className: 'fog' },
  { name: 'clouds', src: clouds, className: 'clouds' },
  { name: 'hearts', src: hearts, className: 'hearts' }
];

const WeatherMenu = () => (
  <div className="block-container">
    {blockImages.map((img, index) => (
      <img src={img.src} key={index} alt={img.name} className={`block ${img.className}`} />
    ))}
  </div>
);

export default WeatherMenu;
