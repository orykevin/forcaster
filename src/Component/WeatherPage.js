import React,{useEffect,useState,useRef} from 'react'
import "../Style/WeatherPage.scss"
import arrow from "../Img/arrow copy.svg"
import WeatherCard from './WeatherCard'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

function WeatherPage({castDisplay,setCast,hourlyWeather,dailyWeather}) {
  const [displayDetail,setDisDet] = useState(false);
  const [gradient,setGradient] = useState(null);
  const [cardActive,setActive] = useState(0);
  const [forecastBy,setBy] = useState("day");
  const [detailWeather,setDetail] = useState({
    "dt":1655380800,
    "temp":25,
    "feels_like":26,
    "humidity":88,
    "wind_speed": 1.96,
    "wind_deg": 113,
    "weather":[{
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04n"
    }]
  });
  const whattoShow = () =>{
    if(window.innerWidth <= 538){
      return 2
    }else if(window.innerWidth <= 738){
      return 3
    }else if(window.innerWidth <= 1024){
      return 4
    }else{
      return 5
    }
  }
  const slider = useRef(null);
  const settings = {
    focusOnSelect: true,
    infinite: false,
    slidesToShow: whattoShow(),
    slidesToScroll: 1,
    speed: 300,
    arrows:false,
    variableWidth:true,
    swipeToSlide: true,
    //intialSlide:cardActive,
  };
  const dt = new Date(detailWeather.dt * 1000);
  //console.log(dailyWeather)
  const formatDate = (dateString) => {
    const options = {  year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  const formatClock = (dateString) => {
    const options1 = { hour:"2-digit", minute:"2-digit"};
    return new Date(dateString).toLocaleString("en-US", options1)
  }
  const clickChange = (i) =>{
    setDetail({
      "dt":i.dt,
      "temp":(forecastBy === "day" ? i.temp.day : i.temp),
      "feels_like":(forecastBy === "day" ? i.feels_like.day : i.feels_like),
      "humidity":i.humidity,
      "wind_speed": i.wind_speed,
      "wind_deg": i.wind_deg,
      "weather":[{
        "id": i.weather[0].id,
        "main": i.weather[0].main,
        "description": i.weather[0].description,
        "icon": i.weather[0].icon,
      }]
    });
    setDisDet(true);
  }
  
  useEffect(() => {
    const timeout = setTimeout(()=>{
      if (slider.current?.slickGoTo)
      slider.current.slickGoTo(cardActive);
    },300);

    return()=>clearTimeout(timeout);
  }, [cardActive]);

  return (
    <div className='w-container' >
        <div className='w-header'>
            <img src={arrow} alt="" onClick={()=>setCast(false)}/>
            <h1>Weather Forecast</h1>
        </div>
        <div className='select-cont'>
            <h4>Forecast by</h4>
            <select name="" id="" onChange={(e)=>{setBy(e.target.value)}} disabled={displayDetail} >
                <option value="day">Day</option>
                <option value="hour">Hour</option>
            </select>
        </div>
        
        {(!displayDetail && window.innerWidth <= 1024) && <div className={`allwth-cont ${displayDetail && "nowrap"}`}>
            {(forecastBy === "day" ? dailyWeather : hourlyWeather).map((i,n)=>{
              if(n<24){
                return <WeatherCard data={i} clickChange={clickChange} setActive={setActive} idx={n} cardActive={cardActive} setGradient={setGradient} />
              }else return false
            })}
        </div> }
        {(displayDetail || window.innerWidth >= 1024)  &&
          <Slider {...settings} className="slide-cont" ref={slider} >
            {(forecastBy === "day" ? dailyWeather : hourlyWeather).map((i,n)=>{
              if(n<24){
                return <WeatherCard data={i} clickChange={clickChange} setActive={setActive} idx={n} cardActive={cardActive} setGradient={setGradient} />
              }else return false
            })}
          </Slider>
        }

        {displayDetail  ? <div className='detail-container1 details-2' >
        <span className='btn-close' onClick={()=>setDisDet(false)}>X</span>
        <div className='detail-date-cont'>
            <h3>{formatDate(dt)} <br/> {formatClock(dt)} </h3>
        </div>
        <div className='w-all-cont'>
        <div className='info-container'>
          <h4>{detailWeather.weather[0].main}</h4>
          <p>{detailWeather.weather[0].description}</p>
        </div>
        <div className='info-container'>
          <h4>Humidity</h4>
          <div className='det-cont'><p>humidity</p><span>{Math.ceil(detailWeather.humidity)} F</span></div>
        </div>
        <div className='info-container'>
          <h4>Temp</h4>
          <div className='det-cont'><p>min</p><span>{Math.ceil(detailWeather.temp)} deg</span></div>
          <div className='det-cont'><p>max</p><span>{Math.ceil(detailWeather.feels_like)} deg</span></div>
        </div>
        <div className='info-container'>
          <h4>Wind</h4>
          <div className='det-cont'><p>speed</p><span>{Math.ceil(detailWeather.wind_speed)} km/h</span></div>
          <div className='det-cont'><p>degree</p><span>{Math.ceil(detailWeather.wind_deg)} deg</span></div>
        </div>
        
        </div>
      </div> : ""}
      {displayDetail  && <span className='background-span' style={gradient}></span>}
    </div>
  )
}

export default WeatherPage