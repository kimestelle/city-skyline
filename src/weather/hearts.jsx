import { Component } from 'react';
import Confetti from 'react-confetti'

function drawHeart(ctx) {
  const length = Math.random() *  5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-5, -length, -5, -length * 3, 0, -length * 3);
  ctx.bezierCurveTo(5, -length * 3, 5, -length, 0, 0);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

class Hearts extends Component {
  render() {

    return (
      <div className="confetti-container">
        <Confetti
          width={1080}
          numberOfPieces={100}
          height={window.innerHeight}
          drawShape={drawHeart}
          colors={['rgba(200, 100, 100, 0.7)']}
          gravity={-0.001}
          angle={90}
          initialVelocityX={0}
          wind={0}
          confettiSource={{
            x: 0,
            w: 1080,
            y: window.innerHeight / 2,
          }}
        />
      </div>
    );
  }
}

export default Hearts;