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
  

  const onLogInButtonClick = () => {
    /* implement this */
  }
  const onAccountCreateButtonClick = () => {
    
  }
  return ( <>
    {Login == "login" ? 
    (<LoginPage loginHandle={setlogin}/>) : 
     (Login == "Logged in") ? (<MainPage/>) : 
      (<CreateAccountPage/>)}
  </>
  );
}

export default App;
