import React from 'react'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Profile from './Components/Profile'
// import Carousel from './Components/Carasoul'
const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* <Carousel /> */}
    </div>
  )
}

export default App
