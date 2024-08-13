import { useState } from 'react'

import './App.css'
import {Router,Routes,BrowserRouter, Route} from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import PrivateRoute from './Components/PrivateRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>

        <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
