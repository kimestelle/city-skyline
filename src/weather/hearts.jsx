import { Component } from 'react';
import heart from "../assets/weather/heart.svg";
import "./weather.css";

class Hearts extends Component {
  render() {

    return (
      <img src={heart} className="heart"/>
  )}
}

export default Hearts;