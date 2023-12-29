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
    
    
    const isApiOn = true;

    if(isApiOn){
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
    }else{
      //example while cant request data again
      const jsonFile = '{"coord":{"lon":10.99,"lat":44.34},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"base":"stations","main":{"temp":298.48,"feels_like":298.74,"temp_min":297.56,"temp_max":300.05,"pressure":1015,"humidity":64,"sea_level":1015,"grnd_level":933},"visibility":10000,"wind":{"speed":0.62,"deg":349,"gust":1.18},"rain":{"1h":3.16},"clouds":{"all":100},"dt":1661870592,"sys":{"type":2,"id":2075663,"country":"IT","sunrise":1661834187,"sunset":1661882248},"timezone":7200,"id":3163858,"name":"Zocca","cod":200}'          
      onSearch(JSON.parse(jsonFile));  
    }
                     
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
  let imgName = "/WheatherImages.jpg";

  console.log(weather);
  console.log(imgName);
  
  switch (weather){
    case 'Rain':
      imgName = "/WheatherImages.jpg"
      break;
    case 'Clear':
      imgName = ""
      break;
    case 'Clouds':
      imgName = ""
      break;
    case 'Snow':
      imgName = ""
      break;
  }
  
  function Image(){
    return <img id="weatherImg" src={imgName} alt={imgName} />
  }


  return(
    <div id="dayDiv">
      <Image />
      <p>{degrees}</p>
    </div>
  )
}

function Week(){
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
