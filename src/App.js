import './App.css';
import { useState } from 'react';

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
    
   /*  fetch('https://api.openweathermap.org/data/2.5/weather?lat=41.4417677&lon=-8.2955712&appid=' + apiKey + '&units=metric')
    .then(response => response.json())
    .then(data => handleSearchData(data))
    */
    const data = {"coord":{"lon":10.99,"lat":44.34},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"base":"stations","main":{"temp":298.48,"feels_like":298.74,"temp_min":297.56,"temp_max":300.05,"pressure":1015,"humidity":64,"sea_level":1015,"grnd_level":933},"visibility":10000,"wind":{"speed":0.62,"deg":349,"gust":1.18},"rain":{"1h":3.16},"clouds":{"all":100},"dt":1661870592,"sys":{"type":2,"id":2075663,"country":"IT","sunrise":1661834187,"sunset":1661882248},"timezone":7200,"id":3163858,"name":"Zocca","cod":200};
    handleSearchData(data);
    const forecast = {"cod":"200","message":0,"cnt":40,"list":[{"dt":1647345600,"main":{"temp":287.39,"feels_like":286.38,"temp_min":286.69,"temp_max":287.39,"pressure":1021,"sea_level":1021,"grnd_level":1018,"humidity":58,"temp_kf":0.7},"weather":[{"id":803,"main":"Clear","description":"broken clouds","icon":"04d"}],"clouds":{"all":71},"wind":{"speed":3.08,"deg":128,"gust":4.3},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2022-03-15 15:00:0"},{"dt":1647356400,"main":{"temp":287.09,"feels_like":286.13,"temp_min":286.5,"temp_max":287.09,"pressure":1021,"sea_level":1021,"grnd_level":1016,"humidity":61,"temp_kf":0.59},"weather":[{"id":803,"main":"Rain","description":"broken clouds","icon":"04d"}],"clouds":{"all":81},"wind":{"speed":3.28,"deg":168,"gust":3.96},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2022-03-15 15:00:00"},{"dt":1647367200,"main":{"temp":285.44,"feels_like":284.6,"temp_min":284.47,"temp_max":285.44,"pressure":1020,"sea_level":1020,"grnd_level":1016,"humidity":72,"temp_kf":0.97},"weather":[{"id":804,"main":"Snow","description":"overcast clouds","icon":"04d"}],"clouds":{"all":90},"wind":{"speed":2.7,"deg":183,"gust":5.59},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2022-03-15 15:00:00"},{"dt":1647766800,"main":{"temp":282.42,"feels_like":280,"temp_min":282.42,"temp_max":282.42,"pressure":1036,"sea_level":1036,"grnd_level":1033,"humidity":60,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":39},"wind":{"speed":4.58,"deg":83,"gust":8.45},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2022-03-20 15:00:00"}],"city":{"id":2643743,"name":"London","coord":{"lat":51.5085,"lon":-0.1257},"country":"GB","population":1000000,"timezone":0,"sunrise":1647324902,"sunset":1647367441}};    
    handleUpdateForecast(forecast);

  }

  console.log(data);
  console.log(forecast);

  return (
    <div id='gridDiv'>
      <SearchBar apiKey = {apiKey} onSearch={handleSearchData} updateForecast={handleUpdateForecast}/>  
      <div id='infoDiv'>
        {data ? <Day data = {data}/> : null}
        {forecast ? <Week data = {forecast}/> : null}
        {/*data ? <Maps data = {//data}/> : null*/}
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

    }).then(fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
      .then(response => response.json())        
      .then(data => {      
            updateForecast(data);
      })
    )
                     
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
  //forecast.shift();

  const listDays = forecast.map((day) =>
    <li>

      <img src={day.weather[0].main + ".png"}   alt={day.weather[0].main + ".png"}></img>

    </li>
  );

  return(
    <div id="weekDiv">
      <ul>{listDays}</ul>
    </div>
  )
}


export default App;
