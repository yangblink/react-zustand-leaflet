import React from "react"
import Map from '@/components/ZustandMap'
import MapToolbar from '@/components/MapToolbar'
import 'leaflet/dist/leaflet.css';

function App() {

  return (
    <React.StrictMode>
      <Map></Map>
      <MapToolbar></MapToolbar>
    </React.StrictMode>
  )
}

export default App
