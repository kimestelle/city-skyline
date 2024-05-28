import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { skyColors } from './sky-colors.jsx';
import './sky.css';
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";

const Sky = ({initHour}) => {
// Setup for color
    const [hour, setHour] = useState(initHour);
    const [color, setColor] = useState(skyColors[initHour].color);
// Update hour 
    useEffect(() => {
        setHour(initHour);
        setColor(skyColors[initHour].color);
    }, [initHour]);
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
        <><div className="background" style={{backgroundColor: color}}/>
        <img 
        src={((hour < 6 || hour > 17) ? sun : moon)} 
        alt={((hour < 6 || hour > 17) ? 'Sun' : 'Moon')} 
        className="sun" />
        </>
    );
}

Sky.propTypes = {
    initHour: PropTypes.any
  }

export default Sky;