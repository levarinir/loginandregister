import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './App.css';
import { isAuthenticated, signout } from './action/auth';
import { getAllMarkers, exportToXls } from './action/marker';
import AddMarker from './component/addMarker';
import DisplayMap from './component/displayMap';

const GOOGLE_MAP_API_KEY = 'AIzaSyCJKkq5fQdA0OWZuWit11ppWltRJiH2ozk';

const loadGoogleMapScript = (callback) => {
  if (
    typeof window.google === 'object' &&
    typeof window.google.maps === 'object'
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', callback);
  }
};

const App = () => {
  const { user } = isAuthenticated();
  let history = useHistory();
  const [loadMap, setLoadMap] = useState(false);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState({ flag: false, msg: '' });

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  useEffect(() => {
    loadMarkersList();
  }, []);

  const loadMarkersList = () => {
    getAllMarkers().then((data) => {
      if (data) {
        setLocations(data);
      } else {
        setError({ flag: true, msg: 'get error from loaded the markers' });
      }
    });
  };

  const exportTo = () => {
    exportToXls().then((data) => {
      if (data) {
        alert('done!');
      } else {
        alert('error!');
      }
    });
  };

  return (
    <div className="App">
      {console.log('locations: ', locations)}
      <div className="App-header">
        <p>Nir app</p>
        {!user ? (
          <div style={{ widt: '100px' }}>
            <Link style={{ margin: '10px' }} to="/login">
              login
            </Link>
            <Link to="/signup">signup</Link>
          </div>
        ) : (
          <p>Welcome back {user ? user.email : null}</p>
        )}
        {user && (
          <span
            style={{ cursor: 'pointer' }}
            onClick={() =>
              signout(() => {
                history.push('/');
              })
            }
          >
            התנתק
          </span>
        )}
      </div>
      {user && (
        <div>
          <div onClick={(e) => exportTo(e)}>export to xls all location</div>
          <div>
            <AddMarker handleAddReview={() => loadMarkersList()} />
            {console.log('location 2', locations, ' loadMap: ', loadMap)}
            {!loadMap ? (
              <div>Loading...</div>
            ) : (
              <DisplayMap markers={locations} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
