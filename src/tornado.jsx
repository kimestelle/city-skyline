import { useState, useEffect } from 'react';
import './tornado.css';
import tornado from './assets/tornado.svg';

function Tornado() {
    const [animationStage, setAnimationStage] = useState(0);
    
    useEffect(() => {
        let timer;
        if (animationStage === 1) {
            timer = setTimeout(() => {
                setAnimationStage(2);
            }, 300); // Move to the bottom right after 1 second
        } else if (animationStage === 2) {
            timer = setTimeout(() => {
                setAnimationStage(3);
            }, 700); // Move to the bottom left after 1 second
        } else if (animationStage === 3) {
            timer = setTimeout(() => {
                setAnimationStage(4);
            }, 1000);
        } else if (animationStage === 4) {
            timer = setTimeout(() => {
                setAnimationStage(5);
            }, 1500); // Move from left to right after 1 second
        }
        return () => clearTimeout(timer);
    }, [animationStage]);

    const startAnimation = () => {
        setAnimationStage(1); // Start the first animation stage
    };

    return (
        <img
            src={tornado}
            className={`tornado interactive 
                ${animationStage === 1 ? 'move-to-bottom-right' : ''} 
                ${animationStage === 2 ? 'move-to-bottom-left' : ''} 
                ${animationStage === 3 ? 'move-left-to-right' : ''}
                ${animationStage === 4 ? 'move-back' : ''}`}
            onClick={startAnimation}
            style={{
                left: animationStage === 0 ? '50%' : undefined,
                bottom: animationStage === 0 ? '-33vh' : undefined,
            }}
        />
    );
}

export default Tornado;