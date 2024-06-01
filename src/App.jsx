import './App.css';
import { useState, useRef} from 'react';
import 'html-to-image';

import ground from './assets/ground.svg';
import title from './assets/title.svg';

import blockImages from './components/block-menu.jsx';
import WeatherMenu from './components/weather-menu.jsx';
// import Snow from './weather/snow.jsx';
import City from './city.jsx';
import Screenshot from './screenshot.jsx'
import Sky from './components/sky.jsx';


function App() {
  const toCaptureRef = useRef(null);
  const [blockType, setType] = useState(null);

  var blockMap = blockImages
  const handleTypeChange = (newType) => {
    setType(newType);
  }

  const handleUndo = () => {
  }


  return (
    <div className="App" ref={toCaptureRef} onContextMenu={(e)=> e.preventDefault()}>

    
      {/* Center bar: City, weather, undo and camera buttons */}
      <div className="center-bar">
        <div className="city-container">
            <City blockType={blockType} onUndo={handleUndo}/>
            <img src={ground} className="floor"/>
            <div className="city-weather">
               {/* <Snow/> */}
            </div>
            <Screenshot targetRef={toCaptureRef}/>
        </div>
        <Sky/>
      </div>


      {/* Bottom bar: menus and title letters */}
      <div className="bottom-bar">
        <div className="block-menu-container">
          <WeatherMenu/>  
        </div>
        <div className="title-container">
          <img src={title} className="ground"/>
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
