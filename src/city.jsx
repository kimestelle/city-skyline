import { useState, useEffect, useRef } from 'react';
import blockImages from './components/block-menu.jsx';
import './city.css'; // Import the CSS file for styling
import PropTypes from 'prop-types';
import Sprite from './components/sprite.jsx';
import undo from './assets/undo.svg';

class Block {
  constructor(name, src, x, height) {
    this.name = name;
    this.src = src;
    this.x = x;
    this.height = height;
    this.y = 0;
  }

  changeHeight(newHeight) {
    if (newHeight > 100) {
      newHeight = 100;
    }
    this.height = newHeight;
  }

  flyOut() {
    if (this.flyOutInterval) {
      clearInterval(this.flyOutInterval);
    }
    const xInc = Math.random() < 0.5 ? -4 : 4;
    let yInc = Math.random() < 0.5 ? -1 : 1;
    let heightFactor = 100;
    this.flyOutInterval = setInterval(() => {
      if (Math.abs(this.y) >= 400 && Math.abs(this.x) >= 400) {
        clearInterval(this.flyOutInterval);
        this.flyOutInterval = null;
        yInc = 0;
        return;
      }
      this.x += xInc;
      this.y += yInc;
      this.changeHeight((heightFactor * 1) / 3);
      yInc *= 2;
    }, 10);
  }
}

function City({ blockType, tornado }) {
  const [blocks, setBlocks] = useState([]);
  const currentBlockRef = useRef(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const [currentBlockHeight, setCurrentBlockHeight] = useState(5);

  const handleUndo = () => {
    const copyArr = [...blocks];
    copyArr.pop();
    setBlocks(copyArr);
  };

  useEffect(() => {
    if (tornado) {
      console.log('TORNADOOOOO');
      blocks.sort((a, b) => a.x - b.x);
      let index = 0;
      let counter = 0.0;

      const tornadoInterval = setInterval(() => {
        counter += 0.01;
        if (counter > 2) {
          clearInterval(tornadoInterval);
          return;
        }

        if (index < blocks.length && counter * 100 >= blocks[index].x) {
          if (blocks[index].name !== 'sprite') {
            blocks[index].flyOut();
          }
          index += 1;
          console.log('fly');
        }
        setBlocks([...blocks]);
      }, 10);

      let spliceCountDown = 0;
      const spliceInterval = setInterval(() => {
        if (spliceCountDown === 1) {
          const updatedBlocks = blocks.filter((block) => block.name !== 'sprite');
          setBlocks(updatedBlocks);
          blocks.splice(0, blocks.length);
          clearInterval(spliceInterval);
          return;
        } else {
          spliceCountDown++;
        }
      }, 1500);
    }
  }, [tornado]);

  const instantiateBlock = (e) => {
    if (!blockType) return;
    if (currentBlockRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const blockImage = blockImages.find((img) => img.name === blockType);
    currentBlockRef.current = new Block(blockImage.name, blockImage.src, xPercent, 5);
    intervalRef.current = setInterval(() => {
      setCurrentBlockHeight((prevHeight) => {
        if (prevHeight >= 100) {
          return 100;
        } else {
          const newHeight = prevHeight + 1;
          currentBlockRef.current.changeHeight(newHeight);
          return newHeight;
        }
      });
    }, 100);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (currentBlockRef.current) {
      const temp = new Block(
        currentBlockRef.current.name,
        currentBlockRef.current.src,
        currentBlockRef.current.x,
        currentBlockRef.current.height
      );
      setBlocks((prevBlocks) => [...prevBlocks, temp]);
      currentBlockRef.current.changeHeight(0);
      currentBlockRef.current = null;
      setCurrentBlockHeight(5);
    }
  };

  const handlePointerDown = (e) => {
    instantiateBlock(e);
  };

  const handlePointerUp = () => {
    stopCounter();
  };

  return (
    <>
      <div
        className={tornado ? 'city notouch' : 'city'}
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {blocks.map((block, index) =>
          block.name === 'sprite' ? (
            <Sprite key={index} x={block.x} height={block.height} tornado={tornado} />
          ) : (
            <img
              key={index}
              src={block.src}
              style={{
                position: 'absolute',
                left: `${block.x}%`,
                bottom: `${block.y}svh`,
                height: `${block.height}%`,
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          )
        )}
        {currentBlockRef.current && (
          <img
            src={currentBlockRef.current.src}
            className="block"
            style={{
              position: 'absolute',
              left: `${currentBlockRef.current.x}%`,
              bottom: `${currentBlockRef.current.y}svh`,
              height: `${currentBlockHeight}%`,
              opacity: '0.8',
              transform: 'translateX(-50%)',
              userSelect: 'none',
            }}
          ></img>
        )}
      </div>
      <button id="button" className="undo interactive" onClick={handleUndo}>
        <img src={undo} />
      </button>
    </>
  );
}

City.propTypes = {
  blockType: PropTypes.string,
  tornado: PropTypes.bool,
  block: PropTypes.any,
  onUndo: PropTypes.func,
  blockImage: PropTypes.shape({
    name: PropTypes.string,
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.object,
  }),
};

export default City;
