import React from 'react'
import "../Style/WeatherPage.scss"
import cloud from "../Img/10d@2x.png"
import getGradient from '../Function/getGradient'

function WeatherCard({data,clickChange,setActive,idx,cardActive,setGradient}) {
  //console.log(data)
  /*const data ={
    "dt": 1655380800,
    "temp": 298.22,
    "feels_like": 299.08,
    "pressure": 1010,
    "humidity": 88,
    "dew_point": 296.09,
    "uvi": 0,
    "clouds": 100,
    "visibility": 10000,
    "wind_speed": 1.96,
    "wind_deg": 113,
    "wind_gust": 2.03,
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
        }
    ],
    "pop": 0.72
}*/

  const tStyle ={
    backgroundImage: `linear-gradient(120deg,${getGradient(data)})`,
  }
  const isObject = (val)=>{
    return(typeof val === 'object')
  }
  const dt = new Date(data.dt * 1000);
  //console.log(isObject(data.temp) ? data.temp.day : data.temp)
  const formatDate = (dateString) => {
    const options = {  year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  const formatClock = (dateString) => {
    const options1 = { hour:"2-digit", minute:"2-digit"};
    return new Date(dateString).toLocaleString("en-US", options1)
  }
  return (
    <div style={tStyle} className={`wcard-cont ${idx===cardActive && "card-active"}`} onClick={()=>{clickChange(data);setActive(idx);setGradient(tStyle)}}>
        <div className='wcard-info'>
            <h4>{Math.ceil(isObject(data.temp) ? data.temp.day : data.temp)}<span>&#176;</span></h4>
            <p>{formatDate(dt)} <br/> {formatClock(dt)}</p>
        </div>
        <div className='wcard-img'>
            <div className='img-cont'>
                <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                <p>{data.weather[0].main}</p>
            </div>
        </div>
    </div>
  )
}

export default WeatherCard