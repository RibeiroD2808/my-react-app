import './App.css';
import { useState } from 'react';

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  
  //api response
  const [data, setData] = useState(0);
  const handleSearchData = (searchData) => {
    
    setData(searchData);
  };

  //default data
  if(!data){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=41.4417677&lon=-8.2955712&appid=' + apiKey + '&units=metric')
    .then(response => response.json())
    .then(data => handleSearchData(data))
  }
  
  return (
    <div id='gridDiv'>
      <SearchBar apiKey = {apiKey} onSearch={handleSearchData}/>  
      {data ? <Day data = {data}/> : null}
      {data ? <Week apiKey = {apiKey} data = {data}/> : null}
      {data ? <Maps data = {data}/> : null}
    </div>
  );
}

function SearchBar({apiKey, onSearch}){
  
  const [searchText, setSearchText] = useState('');

  //set input value
  const handleChange = e => {
    setSearchText(e.target.value)
  }
  

  const handleClick = () => {
    
    //Direct geocoding
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchText + '&appid=' + apiKey)
    .then(response => response.json())
    .then( async data => {
      console.log(data);

      //current weather
      const weatherResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=' + apiKey + '&units=metric');
      const weatherData = await weatherResponse.json();
      //update data
      onSearch(weatherData);

    })
                     
    return;
    
  }

  
  return(
    <div id='searchDiv'>
      <input type='text' id='searchText' onChange={handleChange}></input>
      <button onClick={handleClick}></button>
    </div>
  )
}

function Day({data}){

  
  console.log(data);
  const weather = data.weather[0].main;
  const degrees = data.main.temp;
  const minDegrees = data.main.temp_min;
  const maxDegrees = data.main.temp_max;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  let imgName = "/WheatherImages.jpg";

  console.log(weather);
  console.log(imgName);
  
  switch (weather){
    case 'Rain':
      imgName = "/WheatherImages.jpg"
      break;
    case 'Clear':
      imgName = "/WheatherImages.jpg"
      break;
    case 'Clouds':
      imgName = "/WheatherImages.jpg"
      break;
    case 'Snow':
      imgName = "/WheatherImages.jpg"
      break;
  }
  
  function Image(){
    return <img id="weatherImg" src={imgName} alt={imgName} />
  }

  function DateComponent(){
    const [date, setDate] = useState(new Date());

    const options = {month: 'short' };
    const formattedDate = date.toLocaleString('en-US', options);

    return <p> {date.getDay()} {formattedDate}, {date.getHours()} : {date.getMinutes()} </p>
    
  }


  return(
    <div id="dayDiv">
      <div id='currentWeatherDiv'>
        <DateComponent />
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

function Week({apiKey ,data}){
  
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + {lat} + '&lon=' + {lon} + '&appid=' + apiKey)
    .then(response => {
      response.json();
      console.log(response);
    })
  
  return(
    <div id="weekDiv">
      
    </div>
  )
}

function Maps(data){
  
  function Map({layer}){
    const src = 'https://tile.openweathermap.org/map/' + layer + '/1/1/1.png?appid=9b4b60468dfddcc0882aa6b9937b9a7c';
    return <img id="weatherImg" src={src} alt={layer + 'Map'} />
  }

  return(
    <div id='mapsDiv'>
      <Map layer="temp_new"/>
      <Map layer="clouds_new"/>
    </div>
  )
}

//https://openweathermap.org/api/weathermaps
function Map(layer, z, x, y, apikey){
  
  
  return(
    <div>
      
    </div>
  )
}

function ApiTest() {
  
  const [data, setData] = useState([]);

  fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  .then(response => response.json())
  .then(data => setData(data));


  return (
    <div className='div'>
       {data.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default App;
