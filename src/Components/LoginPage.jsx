import React, { useState } from 'react';
//import {db_connector} from './db_connector.js'

function LoginPage({ loginHandle, users }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //db = new db_connector();

  const handleLogin = () => {
    // Check if the username exists in the map
    if (users.has(username)) {
      // Check if the password matches
      if (users.get(username) === password) {
        setError(''); // Clear any existing error
        loginHandle('Logged in'); // Successfully logged in
      } else {
        setError('Incorrect password. Please try again.');
      }
    } else {
      setError('Username does not exist. Please create an account.');
    }
  };

  return (
    <div className="App"> 
      <div>
        <div className="App-title">Login</div>
      </div>
      <div>
        <input
          value={username}
          placeholder="Enter username here"
          onChange={(ev) => setUsername(ev.target.value)}
        />
      </div>
      <div>
        <input
          value={password}
          type="password"
          placeholder="Enter password here"
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <div>
        <input
          type="button"
          value="Log in"
          onClick={handleLogin}
        />
      </div>
      {error && (
        <div style={{ color: 'red' }}>
          {error}
        </div>
      )}
      <div>
        <div>Don't have an account? Create one!</div>
      </div>
      <div>
        <input
          type="button"
          value="Create account"
          onClick={() => loginHandle('createAccount')}
        />
      </div>
    </div>
  );
}

export default LoginPage;
