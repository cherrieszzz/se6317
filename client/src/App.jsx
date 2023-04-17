import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blogs from './components/pages/Blogs'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Blogs/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
