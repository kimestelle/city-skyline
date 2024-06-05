import { useState, useEffect } from 'react';
import '../city.css'
import PropTypes from 'prop-types';

const Sprite = ({ index, x, height, tornado }) => {
  const [position, setPosition] = useState(x);
  const [direction, setDirection] = useState(Math.random() < 0.5 ? -1 : 1);
  const [speed, setSpeed] = useState(((Math.random() + 1) * height)/ 15);
  const [turn, setTurn] = useState(((Math.random() + 1) / 2) * 60);
  const [y, setY] = useState(0);
  const spriteHeight = height;


  useEffect(() => {
    if (tornado) {
      let incr = 1;
      const tornadoInterval = setInterval(() => {
        setY((prevY) => prevY + incr);
        incr = (incr - 0.7) * 2;
      }, 50);

      return () => clearInterval(tornadoInterval);
    }
  }, [tornado]);


  useEffect(() => {
    if (!tornado) {
      const interval = setInterval(() => {
        if (position <= 0 || position >= (100 - (3 * height / 7)) || turn < 0) {
          setDirection(prevDirection => -prevDirection);
          setSpeed(((Math.random() + 1) * height) / 15);
          setTurn(((Math.random() + 1) / 2) * 30);
        }
        setPosition(prevPosition => {
          setTurn(prevTurn => prevTurn - 1);
          const nextPosition = prevPosition + (direction * speed);
          if (nextPosition < 0) {
              return 5;
          } else if (nextPosition > (100 - (3 * height / 7))) {
              return (95 - (3 * height / 7));
          } else {
              return nextPosition;
          }
        });
        setTurn(prevTurn => prevTurn - 1);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [tornado, height, position, direction, speed, turn]);

  return (
    <object
      ref={index}
      className={tornado ? 'sprite ahh' : (direction === -1 ? 'sprite' : 'sprite reflect')}
      style={{
        left: `${position}%`,
        height: `${spriteHeight}%`,
        width: `${spriteHeight * 3 / 7}%`,
        bottom: `${y}%`,
      }}
    ></object>
  );
};

Sprite.propTypes = {
  x: PropTypes.number,
  height: PropTypes.number,
  index: PropTypes.number,
  tornado: PropTypes.bool,
};

export default Sprite;