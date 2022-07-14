import React from 'react'

function getGradient(data) {
  /*const data ={
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
      "icon": "04n",
    }]
  }*/

  const dt = new Date(data.dt * 1000);
  const formatClock = (dateString) => {
    const options1 = { hour:"2-digit", minute:"2-digit"};
    return new Date(dateString).toLocaleString("en-US", options1)
  }
  const whatTime = () =>{
    let time = dt.getHours()
    if(time >= 6 && time <= 14){
      return 1
    }else if(time >= 15 && time <= 18){
      return 2
    }else{
      return 3
    }
  }

  const whatWeather = () =>{
    let icon = data.weather[0].icon.slice(0,2);
    //console.log(icon)
    if(icon === "01" || icon === "02"){
      return 1
    }else if(icon === "03"){
      return 2
    }else if(icon === "04"){
      return 3
    }else if(icon === "09" || icon === "10"){
      return 4
    }else if(icon === "11" || icon === "50"){
      return 5
    }else if(icon === "13"){
      return 6
    }
  }

  const getCode = (t,w) =>{
    if (w == 1 && t == 1){
      return "#3C78F1,#8DCBD9"
    }else if(w == 1 && t == 2 ){
      return "#5A97CE,#F36A44"
    }else if(w == 1 && t == 3 ){
      return "#021436,#92BAC3"
    }else if(w == 2 && t == 1 ){
      return "#1F82C2,#7EC1E3"
    }else if(w == 2 && t == 2 ){
      return "#308991,#EE9475"
    }else if(w == 2 && t == 3 ){
      return "#282829,#7A85A1"
    }else if(w == 3 && t == 1 ){
      return "#0C3F96,#65A1CE"
    }else if(w == 3 && t == 2 ){
      return "#324BAA,#BB5A40"
    }else if(w == 3 && t == 3 ){
      return "#001B30,#6A6A6A"
    }else if(w == 4 && t == 1 ){
      return "#023F74,#66A8DB"
    }else if(w == 4 && t == 2 ){
      return "#173C5E,#AE635E"
    }else if(w == 4 && t == 3 ){
      return "#000000,#3F4661"
    }else if(w == 5 && t == 1 ){
      return "#1E324D,#457A9D"
    }else if(w == 5 && t == 2 ){
      return "#113E67,#634850"
    }else if(w == 5 && t == 3 ){
      return "#000000,#2C344A"
    }else if(w == 6 && t == 1 ){
      return "#3C78F1,#8DCBD9"
    }else if(w == 6 && t == 2 ){
      return "#3C78F1,#D98D95"
    }else if(w == 6 && t == 3 ){
      return "#06235F,#4162B4"
    }
  }
  let test = "05d.png"
  //console.log(test.slice(0,2))
  //console.log(whatTime())
  //console.log(whatWeather())

  return (
    getCode(whatTime(),whatWeather())
  )
}

export default getGradient