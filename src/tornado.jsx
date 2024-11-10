import { useState, useEffect } from 'react';
import './tornado.css';
import tornado from './assets/tornado.svg';
import PropTypes from 'prop-types';

function Tornado({ onTornado }) {
    const [animationStage, setAnimationStage] = useState(0);
    const [isIdle, setIsIdle] = useState(true);
    const [rattleClass, setRattleClass] = useState('');

    useEffect(() => {
        let timer;

        if (animationStage === 1) {
            setIsIdle(false);
            timer = setTimeout(() => {
                setAnimationStage(2);
            }, 300);
        } else if (animationStage === 2) {
            timer = setTimeout(() => {
                onTornado();
                setAnimationStage(3);
            }, 700);
        } else if (animationStage === 3) {
            timer = setTimeout(() => {
                setAnimationStage(4);
            }, 1000);
        } else if (animationStage === 4) {
            timer = setTimeout(() => {
                setAnimationStage(5);
                setIsIdle(true);
            }, 1500);
        }

        return () => clearTimeout(timer);
    }, [animationStage, onTornado]);

    useEffect(() => {
        let idleTimer;
        if (isIdle) {
            idleTimer = setInterval(() => {
                setRattleClass('rattle-animation');
                setTimeout(() => {
                    setRattleClass('');
                }, 1000); // Matches the duration of the rattle animation (0.1s * 10)
            }, 4000);
        }

        return () => clearInterval(idleTimer);
    }, [isIdle]);

    const startAnimation = () => {
        setAnimationStage(1);
        setIsIdle(false);
    };

    return (
        <img
            src={tornado}
            className={`tornado interactive ${rattleClass}
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
