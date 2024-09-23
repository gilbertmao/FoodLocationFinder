import React, { useState } from 'react'
import './App.css';

/* not 100% sure if this is set up correctly, but i was able to test and see it load on my local machine */

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  

  const onLogInButtonClick = () => {
    /* implement this */
  }
  const onAccountCreateButtonClick = () => {
    /* implement this */
  }
  return ( /* for now, just returns our simple login page */
    <div className = "App"> 
        <div>
            <div className= "App-title">Login</div>
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
                placeholder="Enter password here"
                onChange={(ev) => setPassword(ev.target.value)}
            />
        </div>
        <div>
            <input
                type="button"
                value={'Log in'}
                onClick={onLogInButtonClick}
            />
        </div>
        <div>
            <div>Don't have an account? Create one!</div>
        </div>
        <div>
            <input
                type="button"
                value={'Create account'}
                onClick={onAccountCreateButtonClick}
            />
        </div>
    </div>
  );
}

export default App;
