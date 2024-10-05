import React, { useState } from 'react'
import MainPage from './Components/MainPage';
import LoginPage from './Components/LoginPage';
import CreateAccountPage from './Components/CreateAccountPage';
import './App.css';

/* not 100% sure if this is set up correctly, but i was able to test and see it load on my local machine */

const App = () => {
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [Login, setlogin] = useState('login');
  const [Radius, setRadius] = useState(50);
  const [Latitude, setLatitude] = useState(33.7501);
  const [Longitude, setLongitude] = useState(-84.3885);


  const radiusHandler = (event) => {
    const newValue = Number(event.target.value); // Convert value to number
    setRadius(newValue);
  };
  

  const onLogInButtonClick = () => {
    /* implement this */
  }   
  const onAccountCreateButtonClick = () => {
    
  }
  return ( <>
    {Login == "login" ? 
    (<LoginPage loginHandle={setlogin}/>) : 
    (Login == "Logged in") ? 
    (<MainPage radius={Radius} radiusHandler={radiusHandler} latitude={Latitude} latitudeHandler={setLatitude} longitudeHandler={setLongitude}/>) : 
    (<CreateAccountPage/>)}
  </>
  );
}

export default App;
