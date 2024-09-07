import React, { useState } from 'react'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onLogInButtonClick = () => {
        // TODO UPDATE THIS
    }
    const onAccountCreateButtonClick = () => {
        // TODO UPDATE THIS
    }

    return (  //TODO ADD FORMATTING TO THIS
        <div>
            <div>
                <div>Login</div>
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
    )
}

export default login;