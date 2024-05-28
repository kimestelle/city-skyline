import { useState, useEffect } from 'react';
import '../city.css'
import PropTypes from 'prop-types';

const Sprite = ({ x, height }) => {
  const [position, setPosition] = useState(x);
  const [direction, setDirection] = useState(Math.random() < 0.5 ? -1 : 1);
  const [speed, setSpeed] = useState(((Math.random() + 1) * height)/ 15);
  const [turn, setTurn] = useState(((Math.random() + 1) / 2) * 30);

  useEffect(() => {
    const interval = setInterval(() => {
        if (position <= 0 || position >= (100 - (3 * height / 7)) || turn < 0) {
        // Change direction if the boundary is reached
        setDirection(prevDirection => -prevDirection);
        setSpeed(((Math.random() + 1) * height)/ 15);
        setTurn(((Math.random() + 1) / 2) * 30);
        console.log(position);
      } 

      // Update the position based on the direction
      setPosition(prevPosition => prevPosition < (100 - (3 * height / 7)) & prevPosition > 0 ? (prevPosition + (direction * speed)) : (prevPosition < 0 ? 5 : (95 - (3 * height / 7))));
      setTurn(prevTurn => prevTurn - 1);
    }, 500); // Adjust the interval for the speed of animation

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [height, position, direction, speed, turn]);

  return (
    <div
      className={direction === -1 ? ('sprite') : ('sprite sprite-reflect')}
      style={{
        position: 'absolute',
        bottom: '0',
        left: `${position}%`, // Position the sprite based on the current position
        height: `${height}%`, // Adjust height accordingly
        zIndex: '6',
      }}
    ></div>
  );
};

Sprite.propTypes = {
    x: PropTypes.number,
    height: PropTypes.number,
  };

export default Sprite;