
import { useState, useRef } from 'react';
import blockImages from './components/block-menu.jsx';
import './city.css'; // Import the CSS file for styling
import PropTypes from 'prop-types';
import Sprite from './components/sprite.jsx'
import undo from './assets/undo.svg';

class Block {
  constructor (type, x, height){
    this.name = type.name;
    this.src = type.src;
    this.x = x;
    this.height = height;
  }

  changeHeight(newHeight) {
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

const handleMouseDown = (e) => {
  setCurrentBlockHeight(0); 
  if(!blockType) return;
  const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const blockImage = blockImages.find(img => img.name === blockType);
    currentBlockRef.current = new Block(blockImage, xPercent, 5);
    
    intervalRef.current = setInterval(() => {
      setCurrentBlockHeight((prevHeight) => {
        if (prevHeight >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        const newHeight = prevHeight + 1; // Increment height by 2%
        currentBlockRef.current.height = newHeight;
        return newHeight;
      });
    }, 100); 
    currentBlockRef.current.changeHeight(intervalRef.current);
    console.log(currentBlockRef.current);
}

const handleMouseUp = () => {
  if (currentBlockRef.current) {
      setBlocks((prevBlocks) => [...prevBlocks, currentBlockRef.current]);
  }
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }
  setCurrentBlockHeight(0); 
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
  <button className='undo' onClick={handleUndo}>
          <img src={undo}/>
        </button>
  </>
);
}

City.propTypes = {
  blockType: PropTypes.string,
  block: PropTypes.any,
  onUndo: PropTypes.func,
};

export default City;