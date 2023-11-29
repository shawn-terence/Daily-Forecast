// MapData.js
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapData = ({ coordinates, apiKey }) => {
    console.log('Coordinates:', coordinates);
  if (!coordinates || !coordinates.lat || !coordinates.lon) {
    // Log an error or provide a visual indication
    console.error('Invalid coordinates');
    return null;
  }

  // Calculate a dynamic zoom level based on your use case
  const dynamicZoomLevel = 10;

  return (
    <MapContainer center={[coordinates.lat, coordinates.lon]} zoom={dynamicZoomLevel} style={{ height: '400px' }}>
      <TileLayer
        url={`https://tile.openweathermap.org/map/precipitation_new/${10}/${coordinates.lat}/${coordinates.lon}.png?appid=${apiKey}`}
        attribution='&copy; OpenWeatherMap'
      />
      <Marker position={[coordinates.lat, coordinates.lon]}></Marker>
    </MapContainer>
  );
};

export default MapData;
