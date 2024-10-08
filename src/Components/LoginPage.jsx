import React, { useState } from 'react';


/**
 * The `LoginPage` component handles user login functionality for the Food Location Finder application.
 * It allows users to enter their username and password and attempts to authenticate them.
 *
 * @param {Function} loginHandle - A function passed as a prop to handle the outcome of login or account creation.
 * @param {Map} users - A map containing usernames and passwords, used to validate login credentials.
 *
 * @returns {JSX.Element} The rendered login page component.
 */

function LoginPage({ loginHandle, users }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '16px',
        margin: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '30%',
        alignItems: 'center'
      }}>
        <div className="App"> 
          <div>
            <h1 className="App-title">Food Location Finder</h1>
          </div>
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
      </div>
    </div>
  );
}

export default LoginPage;
