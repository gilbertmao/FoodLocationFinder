import React, { useState } from 'react';
import MainPage from './Components/MainPage';
import LoginPage from './Components/LoginPage';
import CreateAccountPage from './Components/CreateAccountPage';
import './App.css';

const App = () => {
  const [Login, setlogin] = useState('login');
  const [Radius, setRadius] = useState(50);
  const [Latitude, setLatitude] = useState(33.7501);
  const [Longitude, setLongitude] = useState(-84.3885);
  const [users, setUsers] = useState(new Map()); // State for storing usernames and passwords

  const onLogInButtonClick = () => {
    // Implement this if necessary
  };

  const onAccountCreateButtonClick = () => {
    setlogin('createAccount');
  };

  return (
    <>
      {Login === 'login' ? (
        // Pass `users` as a prop to LoginPage
        <LoginPage loginHandle={setlogin} users={users} />
      ) : Login === 'Logged in' ? (
        <MainPage/>
      ) : (
        // Pass `users` and `setUsers` to CreateAccountPage
        <CreateAccountPage loginHandle={setlogin} users={users} setUsers={setUsers} />
      )}
    </>
  );
};

export default App;
