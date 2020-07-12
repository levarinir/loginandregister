import React, { useEffect, useRef, useState } from 'react';

const DisplayMap = ({ markers }) => {
  const googleMapRef = useRef(null);
  let googleMap = null;
  let markerList = [];

  // list of icons
  const iconList = {
    icon1:
      'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Flag--Right-Chartreuse.png',
    icon2:
      'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
    icon3:
      'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png',
    icon4:
      'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png',
  };

  const loadMarkers = () => {
    console.log('markers in loadMatkers:', markers);
    markers.map((m) => {
      console.log('m: ', m);
      if (m.lat && m.long) {
        console.log('m.lat: ', m.lat);
        markerList.push({
          lat: parseFloat(m.lat),
          lng: parseFloat(m.long),
          icon: iconList.icon2,
        });
      }
    });
  };

  useEffect(() => {
    if (markers.length > 0) {
      loadMarkers();
    } else {
      console.log('empty');
    }
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
    console.log('marker list in useEffect:', markerList);
    markerList.map((x) => {
      const marker = createMarker(x);
      bounds.extend(marker.position);
    });
    googleMap.fitBounds(bounds); // the map to contain all markers
  }, [markers]);

  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  };

  const createMarker = (markerObj) =>
    new window.google.maps.Marker({
      position: { lat: markerObj.lat, lng: markerObj.lng },
      map: googleMap,
      icon: {
        url: markerObj.icon,
        // set marker width and height
        scaledSize: new window.google.maps.Size(50, 50),
      },
    });

  return (
    <div ref={googleMapRef} style={{ width: 600, height: 500 }}>
      {console.log('display map', markers)}
    </div>
  );
};

export default DisplayMap;
