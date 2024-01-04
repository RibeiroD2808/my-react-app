import './App.css';
import { useState } from 'react';
import {defaultData} from './Data.js';
function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  
  //api response
  const [data, setData] = useState(0);
  const [forecast, setForecast] = useState(0);

  const handleSearchData = (searchData) => {  
    setData(searchData);
  };

  const handleUpdateForecast = (forecast) => {
    setForecast(forecast);
  };


  //default data
  if(data == 0){
    handleSearchData(defaultData.data);
    handleUpdateForecast(defaultData.forecast);
  }


  return (
    <div id='gridDiv'>
      <SearchBar apiKey = {apiKey} onSearch={handleSearchData} updateForecast={handleUpdateForecast}/>  
      <div id='infoDiv'>
        {data ? <Day data = {data}/> : null}
        {forecast ? <Week data = {forecast}/> : null}
      </div>
    </div>
  );
}

function SearchBar({apiKey, onSearch, updateForecast}){
  
  const [searchText, setSearchText] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  

  //set input value
  const handleChange = e => {
    setSearchText(e.target.value)
  }
  

  const handleClick = () => {
    
    //Direct geocoding
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchText + '&appid=' + apiKey)
    .then(response => response.json())
    .then( async data => {

      //current weather
      const weatherResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=' + apiKey + '&units=metric');
      const weatherData = await weatherResponse.json();

      setLat(data[0].lat);
      setLon(data[0].lon);
      //update data
      onSearch(weatherData);
      console.log(weatherData);

    }).then(fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric')
      .then(response => response.json())        
      .then(data => {      
            updateForecast(data);
            console.log(data);
      })
      
    )
    console.log("Call");         
    return;
    
  }

  
  return(
    <div id='searchDiv'>
      <input type='text' id='searchText' onChange={handleChange}></input>
      <button onClick={handleClick}>Search</button>
    </div>
  )
}

function Day({data}){

  
  const name = data.name;
  const weather = data.weather[0].main;
  const degrees = data.main.temp;
  const minDegrees = data.main.temp_min;
  const maxDegrees = data.main.temp_max;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  let imgName = "/WheatherImages.jpg";
  
  switch (weather){
    case 'Rain':
      imgName = "/Rain.png"
      break;
    case 'Clear':
      imgName = "/Clear.png"
      break;
    case 'Clouds':
      imgName = "/Clouds.png"
      break;
    case 'Snow':
      imgName = "/Snow.png"
      break;
  }
  
  function Image(){
    return <img id="weatherImg" src={imgName} alt={imgName} />
  }

  //today data 
  function DateComponent(){
    const [date, setDate] = useState(new Date());

    const options = {month: 'short' };
    const formattedDate = date.toLocaleString('en-US', options);

    return <p id='dateNow'> {date.getDay()} {formattedDate}, {date.getHours()} : {date.getMinutes()} </p>
    
  }


  return(
    <div id="dayDiv">
      <div id='currentWeatherDiv'>
        <DateComponent />
        <p id='nameP'>{name}</p>
        <p id='degreesP'>{degrees}º</p>
        <div id='minMaxDiv'>
          <p id='minDegreesP'>Min: {minDegrees}º</p>
          <p id='minDegreesP'>Max: {maxDegrees}º</p>
        </div>
        <div id='othersInfDiv'>
          <p id='windSpeedP'>Wind Speed: {windSpeed} m/s</p>
          <p id='humidityP'>Humidity: {humidity}</p>          
        </div>
      </div>
      <Image />
    </div>
  )
}

function Week({data}){
  

  //slice data text and add to array if the data is 15pm
  const forecast = data.list.filter(element =>{
    return element.dt_txt.slice(11, 13) === '15'; 
    })
  forecast.shift();

  //list all forecast
  const listDays = forecast.map((day, i) =>
    <li key={i}>
      <p className='text-center'>{day.dt_txt.slice(5,10)}</p>
      <img src={day.weather[0].main + ".png"}   alt={day.weather[0].main + ".png"}></img>
      <p className='text-center'>{day.main.temp_min} / {day.main.temp_max}  </p>
    </li>
  );

  return(
    <div id="weekDiv">
      <ul>{listDays}</ul>
    </div>
  )
}


export default App;
