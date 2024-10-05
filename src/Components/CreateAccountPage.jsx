function CreateAccountPage({loginHandle}) {
    return (
        <div className = "App"> 
        <div>
            <div className= "App-title">Create Account</div>
        </div>
        <div>
            <input
                //value={username}
                placeholder="Enter username"
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
                value={'Create Account'}
                //onClick={onAccountCreateButtonClick}
            />
        </div>
        <div>
            <div>Already have an account? Log in!</div>
        </div>
        <div>
            <input
                type="button"
                value={'Log in'}
                onClick={() => loginHandle("login")}

            />
        </div>
    </div>
    );
}

export default CreateAccountPage;