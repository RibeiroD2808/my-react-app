import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  const apiKey = '9b4b60468dfddcc0882aa6b9937b9a7c';
  
  return (
    <div id='gridDiv'>
      <Day />
      <SearchBar apiKey = {apiKey}/>  
      <Week />  
      <Maps />  
    </div>
  );
}

function SearchBar(apiKey){
  const [data, setData] = useState([]);

  
  let lat = '41°28 28.0';
  let lon = ''
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={' + apiKey + '}')
  .then(response => response.json())
  .then(data => console.log(data));

  return(
    <>
    
    </>
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
