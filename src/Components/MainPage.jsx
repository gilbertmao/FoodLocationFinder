import './/../App.css';

function MainPage({radius, radiusHandler, latitude, latitudeHandler, longitudeHandler}) {
    return (
        <div>
            <div>
                <div className="container">
                    <div className="input-group">
                        <label htmlFor="input1">Latitude</label>
                        <input
                            id="input1"
                            title="Latitude"
                            placeholder="Enter a Latitude"
                            onChange={(ev) => latitudeHandler(ev.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="input2">Longitude</label>
                        <input
                            id="input2"
                            title="Longitude"
                            placeholder="Enter a Longitude"
                            onChange={(ev) => longitudeHandler(ev.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="input3">Radius: {radius}</label>
                        <input
                            type="range"
                            id="input3"
                            min="0"
                            max="100"
                            value={radius}
                            onChange={radiusHandler}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div className='App'>
                    <input
                        type="button"
                        value={'Search!'}
                        //onClick={() => loginHandle("createAccount")}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainPage;