import React, { useEffect } from 'react';
import Auth from './components/auth';
import Whatsapp from './components/Whatsapp';
import {BrowserRouter , Routes , Route } from "react-router-dom"
import io from "socket.io-client"

const socket = io("http://localhost:5000")
const App = () => {


  useEffect(()=>{
    socket.on("connection")
  })

  const user = window.sessionStorage.getItem("user")

  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/home' element={<Whatsapp user={user}/>}/>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
