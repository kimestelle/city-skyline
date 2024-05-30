import { useState, useEffect } from 'react';
import '../city.css'
import PropTypes from 'prop-types';

const Sprite = ({ index, x, height }) => {
  const [position, setPosition] = useState(x);
  const [direction, setDirection] = useState(Math.random() < 0.5 ? -1 : 1);
  const [speed, setSpeed] = useState(((Math.random() + 1) * height)/ 15);
  const [turn, setTurn] = useState(((Math.random() + 1) / 2) * 30);

  useEffect(() => {
    const interval = setInterval(() => {
        if (position <= 0 || position >= (100 - (3 * height / 7)) || turn < 0) {

        setDirection(prevDirection => -prevDirection);
        setSpeed(((Math.random() + 1) * height)/ 15);
        setTurn(((Math.random() + 1) / 2) * 30);
        console.log(position);
      } 
      setPosition(prevPosition => prevPosition < (100 - (3 * height / 7)) & prevPosition > 0 ? (prevPosition + (direction * speed)) : (prevPosition < 0 ? 5 : (95 - (3 * height / 7))));
      setTurn(prevTurn => prevTurn - 1);
      
    }, 500); 

    return () => clearInterval(interval);
  }, [height, position, direction, speed, turn]);

  return (
    <div
      ref={index}
      className={direction === -1 ? ('sprite') : ('sprite sprite-reflect')}
      style={{
        position: 'absolute',
        bottom: '0',
        left: `${position}%`, 
        height: `${height}%`, 
        zIndex: '6',
      }}
    ></div>
  );
};

Sprite.propTypes = {
    x: PropTypes.number,
    height: PropTypes.number,
    index: PropTypes.number,
    onGetPosition: PropTypes.func.isRequired,
  };

export default Sprite;