import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './auth/Signup'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import './App.css'

function App() {
 
  return (
    <>
      <div>
      g,f;mgr;trg.htr
      <Signup></Signup>
        <RecoilRoot>
         
            <Router>
              <Routes>
                <Route path = '/signup' element= {<Signup/>}></Route>
                <Route path = '/' element= {<Signup/>}></Route>
               
              </Routes>
            </Router>
        </RecoilRoot>
        </div>
    </>
  )
}

export default App
