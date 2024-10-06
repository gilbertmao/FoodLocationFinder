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

    async function handleSearch() {
        setLoading(true);
        setError(null);
    
        try {
            const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
            const { LatLngBounds } = await window.google.maps.importLibrary("core");
    
            const request = {
                locationRestriction: {
                    lat: lat,
                    lng: lng,
                    radius: radius * 1000, // Convert km to meters
                },
                types: ["restaurant"],
                maxResultCount: 20,
            };
    
            const url = constructPlacesApiUrl(request);
            console.log('Request URL:', url);
    
            const response = await axios.get(url);
            console.log('API Response:', response);
    
            const fetchedPlaces = response.data;
            console.log('Fetched Places:', fetchedPlaces);
    
            if (Array.isArray(fetchedPlaces) && fetchedPlaces.length > 0) {
                setPlaces(fetchedPlaces);
    
                const bounds = new LatLngBounds();
    
                // Clear existing markers (if any)
                if (map && typeof map.clearOverlays === 'function') {
                    map.clearOverlays();
                } else {
                    console.warn('map.clearOverlays is not a function. Markers may not be cleared properly.');
                }
    
                for (let place of fetchedPlaces) {
                    if (place.lat && place.lng) {
                        new AdvancedMarkerElement({
                            map,
                            position: {lat: Number(place.lat), lng: Number(place.lng)},
                            title: place.displayName,
                        });
    
                        bounds.extend({lat: Number(place.lat), lng: Number(place.lng)});
                    }
                }
    
                map.fitBounds(bounds);
            } else {
                setError('No restaurants found in this area.');
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
            <h1>Nearby Restaurants</h1>
            <div>
                <input 
                    type="text" 
                    value={lat} 
                    onChange={(e) => setLat(e.target.value)} 
                    placeholder="Latitude"
                />
                <input 
                    type="text" 
                    value={lng} 
                    onChange={(e) => setLng(e.target.value)} 
                    placeholder="Longitude"
                />
                <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={radius} 
                    onChange={(e) => setRadius(Number(e.target.value))} 
                />
                <span>{radius} km</span>
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            <div ref={mapRef} style={{ width: '100%', height: '400px', marginBottom: '20px' }}></div>
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