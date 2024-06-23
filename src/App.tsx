// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import React from "react"
import Map from '@/pages/ZustandMap'
import MapToolbar from '@/pages/MapToolbar'
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
