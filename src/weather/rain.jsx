import { Component } from 'react';
import Confetti from 'react-confetti'

function drawRainDrop(ctx) {
  const length = Math.random() * 1.5;
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
          colors={['rgba(100, 100, 200, 1)', 'rgba(100, 100, 200, 0.5)']}
          gravity={2}
          angle={0}
          initialVelocityX={0}
          wind={0}
          numberOfPieces={200}
          friction={2}
        />
      </div>
    );
  }
}

export default Rain;
