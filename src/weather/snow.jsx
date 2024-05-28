import { Component } from 'react';
import Confetti from 'react-confetti'

function drawSnowflake(ctx) {
  const numPoints = this.numPoints || Math.random(0, 1);
  this.numPoints = numPoints;
  const innerRadius = this.radius * 0.2;
  const outerRadius = this.radius * 0.2;
  ctx.beginPath();
  ctx.moveTo(0, 0 - outerRadius);

  for (let n = 1; n < numPoints * 2; n++) {
    const radius = n % 2 === 0 ? outerRadius : innerRadius;
    const x = radius * Math.sin((n * Math.PI) / numPoints);
    const y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
    ctx.lineTo(x, y);
  }
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

class Snow extends Component {
  render() {

    return (
      <div className="confetti-container">
        <Confetti
            width={1080}
          drawShape={drawSnowflake}
          colors={['rgba(225, 225, 255, 1)', 'rgba(225, 225, 225, 0.8)']}
          gravity={0.03}
          wind={0.01}
        />
      </div>
    );
  }
}

export default Snow;
