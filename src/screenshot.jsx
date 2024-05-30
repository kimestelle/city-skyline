import { useCallback } from 'react';
import { toPng } from 'html-to-image';
import camera from './assets/camera.svg';
import './App.css'
import PropTypes from 'prop-types';

const Screenshot = ({targetRef}) => {
    const onButtonClick = useCallback(() => {
        if (!targetRef || !targetRef.current) {
          console.error('Target ref is not defined or not valid.');
          return;
        }
    
        toPng(targetRef.current, { cacheBust: true })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'my-skyline.png';
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.error('Error generating PNG:', err);
          });
      }, [targetRef]);

  return (
    <button id="button" onClick={onButtonClick} className="camera interactive">
              <img src={camera} alt="camera icon" />
    </button>
  )
}

Screenshot.propTypes = {
    targetRef: PropTypes.any
  };

export default Screenshot;