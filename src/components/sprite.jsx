import { useState, useEffect } from 'react';
import '../city.css'
import PropTypes from 'prop-types';
import walk1 from "../assets/walk1.svg";
import walk2 from "../assets/walk2.svg";
import walk4 from "../assets/walk4.svg";
import aah from "../assets/aah.svg";

const Sprite = ({ index, x, height, tornado }) => {
  const [position, setPosition] = useState(x);
  const [direction, setDirection] = useState(Math.random() < 0.5 ? -1 : 1);
  const [speed, setSpeed] = useState(((Math.random() + 1) * height)/ 15);
  const [turn, setTurn] = useState((Math.random() + 1) * 30);
  const [y, setY] = useState(0);
  const [frame, setFrame] = useState(walk1);
  const [frameDuration, setFrameDuration] = useState(100);
  const [spriteHeight, setSpriteHeight] = useState(height);

  useEffect(() => {
    if (tornado) {
      let incr = height;
      const tornadoInterval = setInterval(() => {
        setY((prevY) => prevY + incr);
        setSpriteHeight(prevHeight => prevHeight * 4 / 5)
        incr = (incr - 0.7) * 2;
      }, 50);

      return () => clearInterval(tornadoInterval);
    }
  }, [tornado]);


  useEffect(() => {
    if (!tornado) {
      const interval = setInterval(() => {
        if (position < 0 || position > 100 - (3 * height / 7) || turn === 0) {
          console.log(position);
          if (position < 0) {
            setPosition(2 * height / 14);
          } else if (position > (100 - (3 * height / 7))) {
            setPosition((100 - (5 * height / 7)));
          }
          setDirection(prevDirection => -prevDirection);
          setSpeed(((Math.random() + 1) * height) / 15);
          setTurn((Math.random() + 1) * 30);
          console.log(direction);
        }
        setPosition (prevPosition => prevPosition + (direction * speed));
      }, 500);

      return () => {
        clearInterval(interval);
      }
    }
  }, [tornado, position, direction, speed, height]);

  useEffect(() => {
    const frameInterval = setInterval(() => {
      if (!tornado) {
        if (frame === walk1) {
          setFrame(walk2);
        } else if (frame === walk2) {
          setFrame(walk4);
          setFrameDuration(220);
        } else if (frame === walk4) {
          setFrame(walk1);
          setFrameDuration(140);
        }
      } else {
        setFrame(aah);
      }
    }, frameDuration);

    return () => clearInterval(frameInterval);
  }, [frame, frameDuration, tornado, direction]);

  return (
    <img
      ref={index}
      src={frame}
      className={(direction === -1 ? 'sprite' : 'sprite reflect')}
      style={{
        left: `${position}%`,
        height: `${spriteHeight}%`,
        width: `${spriteHeight * 3 / 7}%`,
        bottom: `${y}%`,
      }}
    ></img>
  );
};

Sprite.propTypes = {
  x: PropTypes.number,
  height: PropTypes.number,
  index: PropTypes.number,
  tornado: PropTypes.bool,
};

export default Sprite;