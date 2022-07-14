import React,{useEffect,useState} from 'react';
import useFetch from './Function/useFetch';
import useFetch2 from './Function/useFetch2';
import './Style/App.scss';
import useGeoLocation from './Function/useGeoLocation';
import FrontPage from './Component/FrontPage';
import WeatherPage from './Component/WeatherPage';
import getGradient from './Function/getGradient';


function App() {
  const [castDisplay,setCast] = useState(false);

  const location = useGeoLocation()
  //console.log(location.cordinates.lat)
  /*const {data,loading,error} = useFetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.cordinates.lat}&lon=${location.cordinates.long}&appid=814f744a41d74fc77cc944f47c2c107c&units=metric&lang=en`)
  const {data1,loading1,error1} = useFetch2(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.cordinates.lat}&lon=${location.cordinates.long}&zoom=18&addressdetails=1`)
  */
  const {data,loading,error} = useFetch(`https://api.openweathermap.org/data/2.5/onecall?lat=64.128288&lon=-21.827774&appid=814f744a41d74fc77cc944f47c2c107c&units=metric&lang=en`)
  const {data1,loading1,error1} = useFetch2(`https://nominatim.openstreetmap.org/reverse?format=json&lat=64.128288&lon=-21.827774&zoom=18&addressdetails=1`)
  //if (data) console.log(data)
  //if (data1) console.log(data1.data.address)
  let currentWeather = {}
  let dailyWeather = []
  let hourlyWeather = []
  let country = {}
  if (data)  {
    currentWeather = data.data.current;
    hourlyWeather = data.data.hourly;
    dailyWeather = data.data.daily;
  }
  if (data1) {
    country = data1.data.address;
  }
  

  return (
    <div className="App">
      {data && <FrontPage currentWeather={currentWeather} country={country} castDisplay={castDisplay} setCast={setCast} />}
      {castDisplay && <WeatherPage castDisplay={castDisplay} setCast={setCast} hourlyWeather={hourlyWeather} dailyWeather={dailyWeather} />}
    </div>
  );
}

export default App;
