import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { skyColors } from './sky-colors.jsx';
import './sky.css';
import '../App.css';
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";

const Sky = () => {
// Setup for color
    const [hour, setHour] = useState(0);
    const [color, setColor] = useState(skyColors[0].color);
// Update hour 
    const handleDayChange = () => {
        if (hour < 6 || hour > 19){
            setHour(12);
            setColor(skyColors[12].color);
        } else {
            setHour(0);
            setColor(skyColors[0].color);
        }
    };
// Timer for incrementing
    useEffect(() => {
        const timer = setTimeout(() => {
            setHour(prevHour => (prevHour === 23 ? 0 : prevHour + 1));
            setColor(hour === 23 ? skyColors[0].color : skyColors[hour + 1].color);
        }, 10000);
        console.log(hour);
        console.log(color);
        return () => {
          clearTimeout(timer);
        };
      }, [hour, color]);

    return (
        <><button className="sunbox interactive" onClick={handleDayChange}>
            <img 
            src={((hour < 6 || hour > 17) ? sun : moon)} 
            alt={((hour < 6 || hour > 17) ? 'Sun' : 'Moon')} 
            className="sun interactive" />
        </button>
        <div className="background" style={{backgroundColor: color}}/>
        </>
    );
}

Sky.propTypes = {
    initHour: PropTypes.any
  }

export default Sky;