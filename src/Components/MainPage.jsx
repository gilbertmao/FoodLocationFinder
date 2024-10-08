import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function MainPage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [lat, setLat] = useState('33.7776');
    const [lng, setLng] = useState('-84.4048');
    const [radius, setRadius] = useState(1); // Default 1 km
    const [sortColumn, setSortColumn] = useState('rating');
    const [sortOrder, setSortOrder] = useState('desc');
    const [numResults, setNumResults] = useState(20);
    const [selectedValue, setSelectedValue] = useState('restaurant'); 
    const [markers, setMarkers] = useState([]);
    
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    function cutPlacesDown(places) {
        if (places) {
            var placesNew = [];
            var i = 0;
            while (i < numResults) {
                placesNew.push(places[i]);
                i++;
            }
            return placesNew;
        }
    }

    useEffect(() => {
        initMap();
    }, []);
    async function initMap() {
        try {
            const { Map } = await window.google.maps.importLibrary("maps");
            let center = new window.google.maps.LatLng(33.7776, -84.4048); // Atlanta coordinates

            const newMap = new Map(mapRef.current, {
                center: center,
                zoom: 14,
                mapId: "DEMO_MAP_ID", // Replace with your actual Map ID if using Cloud-based styling
            });

            setMap(newMap);
        } catch (err) {
            console.error('Error initializing map:', err);
            setError('Failed to load the map. Please try again later.');
        }
    }

    function constructPlacesApiUrl(request) {
        const baseUrl = 'http://localhost:8090/places';
        const params = new URLSearchParams();
        params.append('lat', `${request.locationRestriction.lat}`);
        params.append('lng', `${request.locationRestriction.lng}`);
        params.append('radius', request.locationRestriction.radius);
        request.types.forEach(type => params.append('types', type));
                
        return `${baseUrl}?${params.toString()}`;
    }

    function clearMarkers() {
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);
    }

    async function handleSearch() {
        setLoading(true);
        setError(null);

        clearMarkers();
    
        try {
            const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
            const { LatLngBounds } = await window.google.maps.importLibrary("core");

            const bounds = new LatLngBounds();

            const request = {
                locationRestriction: {
                    lat: lat,
                    lng: lng,
                    radius: radius * 1000, // Convert km to meters
                },
                types: [selectedValue],
                maxResultCount: numResults > 20 ? 20 : numResults,
            };
    
            const url = constructPlacesApiUrl(request);
            console.log('Request URL:', url);
    
            const response = await axios.get(url);
            console.log('API Response:', response);
    
            var fetchedPlaces = response.data;
            console.log('Fetched Places:', fetchedPlaces);
    
            if (Array.isArray(fetchedPlaces) && fetchedPlaces.length > 0) {
                fetchedPlaces = cutPlacesDown(fetchedPlaces);
                setPlaces(fetchedPlaces);
    

                const newMarkers = fetchedPlaces.map(place => {
                    if (place.lat && place.lng) {
                        const position = {lat: Number(place.lat), lng: Number(place.lng)};
                        const marker = new AdvancedMarkerElement({
                            map,
                            position: position,
                            title: place.displayName,
                        });
                        bounds.extend(position);
                        return marker;
                    }
                    return null;
                }).filter(Boolean);

                setMarkers(newMarkers);
                map.fitBounds(bounds);
            } else {
                setError('No points of interest found in this area.');
            }
        } catch (err) {
            console.error('Error details:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response:', err.response.data);
                console.error('Error status:', err.response.status);
                setError(`Server error: ${err.response.status}. ${err.response.data.message || ''}`);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('Error request:', err.request);
                setError('No response received from the server. Please check your connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', err.message);
                setError(`An error occurred: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    }

    function handleSort(column) {
        const newOrder = column === sortColumn && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        setSortColumn(column);

        const sortedPlaces = [...places].sort((a, b) => {
            if (column === 'rating') {
                return sortOrder === 'asc' 
                    ? (a.rating || 0) - (b.rating || 0)
                    : (b.rating || 0) - (a.rating || 0);
            } else if (column === 'price') {
                const priceOrder = ['N/A', '$', '$$', '$$$', '$$$$'];
                const aIndex = priceOrder.indexOf(a.price || 'N/A');
                const bIndex = priceOrder.indexOf(b.price || 'N/A');
                return sortOrder === 'asc' ? aIndex - bIndex : bIndex - aIndex;
            }
            return 0;
        });

        setPlaces(sortedPlaces);
    }

    function renderPlacesTable() {
        return places.map((place, index) => (
            <tr key={index}>
                <td>{place.displayName || 'N/A'}</td>
                <td>{place.rating || 'N/A'}</td>
                <td>{place.price || 'N/A'}</td>
                <td>{place.address || 'N/A'}</td>
            </tr>
        ));
    }

    return (
        <div>
            <h1 className='App'>Search for nearby points of interest</h1>
            <div className="container">
                <div className="input-group">
                    <label htmlFor="input1">Latitude</label>
                    <input
                        id="input1"
                        title="Latitude"
                        placeholder="Enter a Latitude"
                        value={lat}
                        onChange={(ev) => setLat(ev.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="input2">Longitude</label>
                    <input
                        id="input2"
                        title="Longitude"
                        placeholder="Enter a Longitude"
                        value={lng}
                        onChange={(ev) => setLng(ev.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="input3">Number of results (Max: 20)</label>
                    <input
                        id="input3"
                        title="Number of results"
                        placeholder="Enter number of results"
                        value={numResults}
                        onChange={(ev) => setNumResults(ev.target.value > 20 ? 20 : ev.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="input4">Radius: {radius} km</label>
                    <input
                        type="range"
                        id="input4"
                        min="0"
                        max="100"
                        value={radius}
                        onChange={(ev) => setRadius(Number(ev.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="input5">Select what to search for</label>
                    <select id="input5" value={selectedValue} onChange={handleChange}>
                        <option value="restaurant">Restaurants</option>
                        <option value="museum">Museums</option>
                        <option value="park">Parks</option>
                    </select>
                </div>
            </div>
            <div className='App'>
                <button style={{height: '30px', width : '100px'}} onClick={handleSearch} disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            <div ref={mapRef} style={{ width: '100%', height: '400px', marginBottom: '20px', marginTop: '20px'}}></div>
            {places.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Name</th>
                            <th 
                                style={tableHeaderStyle} 
                                onClick={() => handleSort('rating')}
                            >
                                Rating {sortColumn === 'rating' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th 
                                style={tableHeaderStyle}
                                onClick={() => handleSort('price')}
                            >
                                Price {sortColumn === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th style={tableHeaderStyle}>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPlacesTable()}
                    </tbody>
                </table>
            ) : (
                <p>No places data available</p>
            )}
        </div>
    );
}

const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    cursor: 'pointer'
};

export default MainPage;