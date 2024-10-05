import React, { useState } from 'react';
import MainPage from './Components/MainPage';
import LoginPage from './Components/LoginPage';
import CreateAccountPage from './Components/CreateAccountPage';
import './App.css';

const App = () => {
  const [Login, setlogin] = useState('login');
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
        <LoginPage loginHandle={setlogin} />
      ) : Login === 'Logged in' ? (
        <MainPage />
      ) : (
        <CreateAccountPage loginHandle={setlogin} users={users} setUsers={setUsers} />
      )}
    </>
  );
};

export default App;
