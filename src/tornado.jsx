import { useState, useEffect } from 'react';
import './tornado.css';
import tornado from './assets/tornado.svg';
import PropTypes from 'prop-types';

function Tornado({ onTornado }) {
    const [animationStage, setAnimationStage] = useState(0);

    useEffect(() => {
        let timer;
        if (animationStage === 1) {
            timer = setTimeout(() => {
                setAnimationStage(2);
            }, 300); 
        } else if (animationStage === 2) {
            timer = setTimeout(() => {
                onTornado();
                console.log('tornado queued')
                setAnimationStage(3);
            }, 700); 
        } else if (animationStage === 3) {
            timer = setTimeout(() => {
                console.log('stage4')
                setAnimationStage(4);
            }, 1000);
        } else if (animationStage === 4) {
            timer = setTimeout(() => {
                setAnimationStage(5);
            }, 1500); 
        }
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationStage]);

    const startAnimation = () => {
        setAnimationStage(1);
    };

    return (
        <img
            src={tornado}
            className={`tornado interactive
                ${animationStage === 1 ? 'move-to-bottom-right' : ''} 
                ${animationStage === 2 ? 'move-to-bottom-left absolute' : ''} 
                ${animationStage === 3 ? 'move-left-to-right absolute' : ''}
                ${animationStage === 4 ? 'move-back' : ''}`}
            onClick={startAnimation}
        />
    );
}

Tornado.propTypes = {
    onTornado: PropTypes.func,
  };

export default Tornado;