import './App.css';
import { useState, useRef} from 'react';
import 'html-to-image';
import Sky from './components/sky.jsx';
import ground from './assets/ground.svg';
import title from './assets/title.svg';
import blockImages from './components/block-menu.jsx';
import WeatherMenu from './components/weather-menu.jsx';
// import Snow from './weather/snow.jsx';
import City from './city.jsx';
import Screenshot from './screenshot.jsx'
import sun from "./assets/sun.svg";
import moon from "./assets/moon.svg";
import Tornado from "./tornado.jsx";


function App() {
  const [hour, setHour] = useState(0);
  const toCaptureRef = useRef(null);
  const [blockType, setType] = useState(null);

  var blockMap = blockImages
  const handleTypeChange = (newType) => {
    setType(newType);
    blockMap = blockImages;
  }

  const handleHourChange = (newHour) => {
    setHour(newHour);
  };

  const handleDayChange = () => {
    setHour(prevHour => ((prevHour < 6 || prevHour > 18) ? 12 : 0));
  };

  const handleUndo = () => {
  }



  return (
    <div className="App" ref={toCaptureRef}>
      {/* Top bar: undo and screenshot */}
      <div className="top-bar">

      </div>


      <div className="center-bar">
        <div className="city-container">
            <City blockType={blockType} onUndo={handleUndo}/>
            <img src={ground} style={{ userSelect: 'none'}}/>

            <div className="city-weather">
               {/* <Snow/> */}
            </div>
            <Screenshot targetRef={toCaptureRef}/>
        </div>
        <button className="sunbox interactive" onClick={handleDayChange}>
            <img 
            src={((hour < 6 || hour > 17) ? sun : moon)} 
            alt={((hour < 6 || hour > 17) ? 'Sun' : 'Moon')} 
            className="sun interactive" />
        </button>
        <Sky initHour={hour} onHourChange={handleHourChange}/>
      </div>



      <div className="bottom-bar">
        <div className="block-menu-container">
          <WeatherMenu/>  
        </div>
        <div className="title-container">
          <img src={title} className="ground"/>
          <Tornado />
        </div>
        <div className="block-menu-container">
        <div className="block-container" >
          {blockMap.map((image, index) => (
            <img src={image.src} key={index} alt={image.name} className={(image.name === blockType ? `block${image.className} shadow interactive` : `block${image.className} interactive`)} onClick={() => handleTypeChange(image.name)}/>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
