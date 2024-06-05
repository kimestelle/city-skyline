import fogcloud from "../assets/weather/fogcloud.svg";
import "./weather.css";

const Fog = () => {
    
    return (
      <>
      <img src={fogcloud} className='fogcloud one'/>
      <img src={fogcloud} className='fogcloud two'/>
      </>
    );
  };
  
  export default Fog;