import './App.css';
import { useState, useRef} from 'react';
import 'html-to-image';

import ground from './assets/ground.svg';
import title from './assets/title.svg';

import blockImages from './components/block-menu.jsx';
import WeatherMenu from './components/weather-menu.jsx';
import Weather from './weather/weather.jsx';
import City from './city.jsx';
import Screenshot from './screenshot.jsx'
import Sky from './components/sky.jsx';
import Tornado from './tornado.jsx'


function App() {
  const toCaptureRef = useRef(null);
  const [blockType, setType] = useState('sprite');
  const [weather, setWeather] = useState(null);
  const [day, setDay] = useState(true);
  const [tornado, setTornado] = useState(false);

  var blockMap = blockImages
  const handleTypeChange = (newType) => {
    setType(newType);
  }

  const handleUndo = () => {
  }

  const handleDayChange = (dayChange) => {
    setDay(dayChange);
  };

  const handleWeatherChange = (weatherChange) => {
    setWeather(weatherChange);
    console.log(weather);
  };

  const handleTornado = () => {
    setTornado(true);
    console.log('tornado triggered')
    setTimeout(() => {
      setTornado(false);
    }, 2500); 
  };

  return (
    <div className="App" ref={toCaptureRef} onContextMenu={(e)=> e.preventDefault()}>
      {/* Center bar: City, weather, undo and camera buttons */}
      <div className="center-bar">
        <div className="city-container">
            <City blockType={blockType} onUndo={handleUndo} tornado={tornado}/>
            <img src={ground} className="floor"/>
            <div className="city-weather">
               <Weather weather={weather} day={day}/>
            </div>
            <Screenshot targetRef={toCaptureRef}/>
        </div>
        <Tornado onTornado={handleTornado}/>
        <Sky onDayChange={handleDayChange}/>
      </div>


      {/* Bottom bar: menus and title letters */}
      <div className="bottom-bar">
        {/* <div className='block-menu-directions-container'> */}
        <div className="block-menu-container">
          <WeatherMenu onWeatherChange={handleWeatherChange}/>  
        </div>
        <h5 className='text-red'>select weather</h5>
        {/* </div> */}
        <div className="title-container">
          <img src={title} className="title"/>
        </div>
        {/* <div className='block-menu-directions-container'> */}
        <div className="block-menu-container">
        <div className="block-container">
          {blockMap.map((image, index) => (
            <img 
              src={image.src} 
              key={index} 
              alt={image.name} 
              className={`${image.name === blockType ? `block${image.className} selected-block shadow interactive` : `block${image.className} interactive`}`} 
              onClick={() => handleTypeChange(image.name)} 
            />
          ))}
        </div>

        </div>
        <h5 className='text-red'>select block</h5>
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
