import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Userlogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path='/login' element={<Userlogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignUp />} />

        <Route path='/home' element={<UserProtectedWrapper> <Home /></UserProtectedWrapper>} />
        <Route path='/user-logout' element={<UserProtectedWrapper> <Home /></UserProtectedWrapper>} />

      </Routes>
    </div>
  ) 
}

export default App
