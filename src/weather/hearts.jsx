import { Component } from 'react';
import Confetti from 'react-confetti';
import heart from '../assets/weather/heart.svg'

class Hearts extends Component {
  render() {

    return (
      <div className="confetti-container">
        <Confetti
          width={1080}
          drawShape={heart}
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

export default Hearts;