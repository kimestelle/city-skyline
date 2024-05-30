
import { useState, useRef } from 'react';
import blockImages from './components/block-menu.jsx';
import './city.css'; // Import the CSS file for styling
import PropTypes from 'prop-types';
import Sprite from './components/sprite.jsx'
import undo from './assets/undo.svg';

class Block {

  constructor (name, src, x, height){
    this.name = name;
    this.src = src;
    this.x = x;
    this.height = height;
  }

  changeHeight(newHeight) {
    if (newHeight > 100) {
      newHeight = 100;
    }
    this.height = newHeight;
  }
}

function City ({blockType}) {
const [blocks, setBlocks] = useState([]);
const currentBlockRef = useRef(null);
const containerRef = useRef(null);
const intervalRef = useRef(null);
const [currentBlockHeight, setCurrentBlockHeight] = useState(5);

const handleUndo = () => {
  const copyArr = [...blocks];
  copyArr.pop();
  setBlocks(copyArr);
}

const instantiateBlock = (e) => {
  if(!blockType) return;
  if (currentBlockRef.current) return;
  const container = containerRef.current;
  const rect = container.getBoundingClientRect();
  const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
  const blockImage = blockImages.find(img => img.name === blockType);
  currentBlockRef.current = new Block(blockImage.name, blockImage.src, xPercent, 5);
  console.log(currentBlockRef.current);
  intervalRef.current = setInterval(() => {
    setCurrentBlockHeight((prevHeight) => {
      if (prevHeight >= 100) {
        return 100;
      } else {
        const newHeight = prevHeight + 1;
        currentBlockRef.current.changeHeight(newHeight);
        return newHeight;
      }

    })
  }, 100);
}

const stopCounter = () => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
  console.log(currentBlockRef.current);
  if (currentBlockRef.current) {
      const temp =  new Block(currentBlockRef.current.name, currentBlockRef.current.src, currentBlockRef.current.x, currentBlockRef.current.height);
      setBlocks((prevBlocks) => [...prevBlocks, temp]);
      currentBlockRef.current.changeHeight(0);
      currentBlockRef.current = null;
      setCurrentBlockHeight(5);
      console.log(temp);
  }
};  

const handleMouseDown = (e) => {
  instantiateBlock(e);
}

const handleMouseUp = () => {
  stopCounter();
};

return (
  <>
  <div
    className="city"
    ref={containerRef}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
  >
    {blocks.map((block, index) => (
      block.name === "sprite" ? (
        <Sprite key={index} x={block.x} height={block.height}/>
      ) : (
      <img
        key={index}
        src={block.src}
        style={{
          position: 'absolute',
          left: `${block.x}%`,
          bottom: '0%',
          height: `${block.height}%`,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      />)
    ))}
    {currentBlockRef.current && (
      <img
      src={currentBlockRef.current.src}
      className='block'
        style={{
          position: 'absolute',
          left: `${currentBlockRef.current.x}%`,
          bottom: '0',
          height: `${currentBlockHeight}%`,
          opacity: '0.8',
          transform: 'translateX(-50%)',
          userSelect: 'none'
        }}
      ></img>
    )}
  </div>
  <button id="button" className='undo interactive' onClick={handleUndo}>
          <img src={undo}/>
        </button>
  </>
);
}

City.propTypes = {
  blockType: PropTypes.string,
  block: PropTypes.any,
  onUndo: PropTypes.func,
  blockImage: PropTypes.shape({
    name: PropTypes.string,
    src: PropTypes.oneOfType([
      PropTypes.string,  
      PropTypes.object 
    ]),
    className: PropTypes.object,
  })
};

export default City;