import './App.css';
import { useState, useRef} from 'react';
import 'html-to-image';
import Sky from './components/sky.jsx';
import ground from './assets/ground.svg';
import title from './assets/title.svg';
import tornado from './assets/tornado.svg';
import blockImages from './components/block-menu.jsx';
import WeatherMenu from './weather-menu.jsx';
// import Snow from './weather/snow.jsx';
import City from './city.jsx';
import Screenshot from './screenshot.jsx'


function App() {
  const [hour, setHour] = useState(0);
  const toCaptureRef = useRef(null);
  const [blockType, setType] = useState(null);

  const handleTypeChange = (newType) => {
    setType(newType);
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
        <button className="sunbox" onClick={handleDayChange} />
        <Sky initHour={hour} onHourChange={handleHourChange}/>
      </div>



      <div className="bottom-bar">
        <div className="block-menu-container">
          <WeatherMenu/>  
        </div>
        <div className="title-container">
          <img src={title} className="ground"/>
          <img src={tornado} className="tornado"/>
        </div>
        <div className="block-menu-container">
        <div className="block-container">
          {blockImages.map((img, index) => (
            <img src={img.src} key={index} alt={img.name} className={`block${img.className}`} onClick={() => handleTypeChange(img.name)}/>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
