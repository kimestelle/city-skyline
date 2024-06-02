import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { skyColors } from './sky-colors.jsx';
import './sky.css';
import '../App.css';
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";

const Sky = ({onDayChange}) => {
// Setup for color
    const [hour, setHour] = useState(0);
    const [color, setColor] = useState(skyColors[0].color);
// Update hour 
    const handleDayChange = () => {
        const newHour = hour < 6 || hour > 19 ? 12 : 0;
        setHour(newHour);
        setColor(skyColors[newHour].color);
        onDayChange(newHour < 6 || newHour > 19);
    };

// Timer for incrementing
    useEffect(() => {
        const timer = setTimeout(() => {
            setHour(prevHour => (prevHour === 23 ? 0 : prevHour + 1));
            setColor(hour === 23 ? skyColors[0].color : skyColors[hour + 1].color);
        }, 10000);
        console.log(hour);
        console.log(color);
        onDayChange(hour < 6 || hour > 19);
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
    initHour: PropTypes.any,
    onDayChange: PropTypes.func.isRequired,
  }

export default Sky;