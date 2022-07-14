import React,{useEffect,useState} from 'react'
import ham from "../Img/ham.svg"
import "../Style/FrontPage.scss"
import arrow from "../Img/arrow.svg"
import getGradient from '../Function/getGradient'
import Credit from './Credit'

function FrontPage({currentWeather,country,castDisplay,setCast}) {
  const [display,setDisplay] = useState(false)
  const [displayCredit,setCredit] = useState(false)
  const dt = new Date(currentWeather.dt * 1000);
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric',  day: 'numeric',month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  return (
    <div className='front-container' style={{
      backgroundImage: `linear-gradient(${getGradient(currentWeather)})`,
    }}>
        <div className='header'>
            <h1>Forcaster</h1>
            <img src={ham} alt="" onClick={()=>setCredit(!displayCredit)} />
        </div>
        <div className='center-desk'>
        {!display  ? <div className='current-container'>
            <p>{formatDate(dt)}</p>
            <h1>{Math.ceil(currentWeather.temp)}<span>&#176;</span></h1>
            <h4>{currentWeather.weather[0].main}</h4>
            <p>{country.city}</p>
            <p>{country.country}</p>
        </div> : ""}
        
        {window.innerWidth <= 1024 ? <div className={`details-btn ${display  ? "opened" : ""}`}>
            <img src={arrow} alt="" onClick={()=> display ? setDisplay(false) : setDisplay(true)} />
            {!display ? <p>details</p> : ""}
        </div> : ""}
        {(display || window.innerWidth >= 1024) ?
        <div className='detail-container'>
        <div className='info-container'>
          <h4>{currentWeather.weather[0].main}</h4>
          <p>{currentWeather.weather[0].description}</p>
        </div>
        <div className='info-container'>
          <h4>Temp</h4>
          <div className='det-cont'><p>min</p><span>{Math.ceil(currentWeather.temp)} c</span></div>
          <div className='det-cont'><p>max</p><span>{Math.ceil(currentWeather.feels_like)} c</span></div>
        </div>
        <div className='info-container'>
          <h4>Humidity</h4>
          <div className='det-cont'><p>humidity</p><span>{Math.ceil(currentWeather.humidity)} F</span></div>
        </div>
        <div className='info-container'>
          <h4>Wind</h4>
          <div className='det-cont'><p>speed</p><span>{Math.ceil(currentWeather.wind_speed)} km/h</span></div>
          <div className='det-cont'><p>degree</p><span>{Math.ceil(currentWeather.wind_deg)} deg</span></div>
        </div>
      </div> : ""}
      
        
        {<button onClick={()=> castDisplay ? setCast(false) : setCast(true) }>Start Forecast</button>}
        </div>
        {displayCredit && <Credit setCredit={setCredit} displayCredit={displayCredit} />}
    </div>
  )
}

export default FrontPage