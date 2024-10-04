function LoginPage({loginHandle}){
    return (
        <div className = "App"> 
            <div>
                <div className= "App-title">Login</div>
            </div>
            <div>
                <input
                    //value={username}
                    placeholder="Enter username here"
                    //onChange={(ev) => setUsername(ev.target.value)}
                />
            </div>
            <div>
                <input
                    //value={password}
                    placeholder="Enter password here"
                    //onChange={(ev) => setPassword(ev.target.value)}
                />
            </div>
            <div>
                <input
                    type="button"
                    value={'Log in'}
                    //onClick={onLogInButtonClick}
                />
            </div>
            <div>
                <div>Don't have an account? Create one!</div>
            </div>
            <div>
                <input
                    type="button"
                    value={'Create account'}
                    onClick={() => loginHandle("createAccount")}
                />
            </div>
        </div>
    );
}

export default LoginPage;