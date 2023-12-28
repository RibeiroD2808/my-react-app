import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  console.log(apiKey);
  
  //api response
  const [data, setData] = useState(0);
  const handleSearchData = (searchData) => {
    
    setData(searchData);
    console.log(data);
    console.log(data.clouds);

  };

  return (
    <div id='gridDiv'>
      <Day />
      <SearchBar apiKey = {apiKey} onSearch={handleSearchData}/>  
      <Week />  
      <Maps />  
    </div>
  );
}

function SearchBar({apiKey, onSearch}){
  
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [searchText, setSearchText] = useState('');

  //set input value
  const handleChange = e => {
    setSearchText(e.target.value)
  }
  

  const handleClick = () => {
    
    //example while cant request data again
    setLat(10.99);
    setLon(44.34);
    
    const jsonFile = '{"coord":{"lon":10.99,"lat":44.34},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"base":"stations","main":{"temp":298.48,"feels_like":298.74,"temp_min":297.56,"temp_max":300.05,"pressure":1015,"humidity":64,"sea_level":1015,"grnd_level":933},"visibility":10000,"wind":{"speed":0.62,"deg":349,"gust":1.18},"rain":{"1h":3.16},"clouds":{"all":100},"dt":1661870592,"sys":{"type":2,"id":2075663,"country":"IT","sunrise":1661834187,"sunset":1661882248},"timezone":7200,"id":3163858,"name":"Zocca","cod":200}'          
    onSearch(JSON.parse(jsonFile));                   
    return;
    //Direct geocoding
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchText +'&appid=' + apiKey.apiKey)
      .then(response => response.json())
      .then(data => {
        setLat(data[0].lat);
        setLon(data[0].lon);
      //Call current weather data
      }).then(fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey.apiKey + '&units=metric')
              .then(response => response.json())
              .then(data => onSearch(data))
      )
  }

  
  return(
    <div id='searchDiv'>
      <input type='text' id='searchText' onChange={handleChange}></input>
      <button onClick={handleClick}></button>
    </div>
  )
}

function Day(){
  return(
    <div id="dayDiv">

    </div>
  )
}

function Week(){
  return(
    <div id="weekDiv">
    
    </div>
  )
}

function Maps(){
  
  return(
    <div id='mapsDiv'>
      
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
