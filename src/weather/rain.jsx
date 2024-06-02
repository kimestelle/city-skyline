import { Component } from 'react';
import Confetti from 'react-confetti'

function drawRainDrop(ctx) {
  const length = Math.random() * 2;
  ctx.beginPath();
  ctx.moveTo(0,0)
  ctx.lineTo(0, length);
  ctx.stroke();
  ctx.closePath();
}

class Rain extends Component {
  render() {

    return (
      <div className="confetti-container">
        <Confetti
          width={1080}
          drawShape={drawRainDrop}
          colors={['rgba(100, 100, 200, 0.7)']}
          gravity={2}
          angle={0}
          initialVelocityX={0}
          wind={0}
        />
      </div>
    );
  }
}

export default Rain;
