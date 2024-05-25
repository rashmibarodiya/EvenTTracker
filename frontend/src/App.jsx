import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import AddTodo from './todo/AddTodo'
import TodoList2 from './todo/TodoList2'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import './App.css'

function App() {
 
  return (
    <>
           
        <RecoilRoot>
        {/* <Signup></Signup> */}
            <Router>
              <Routes>
                <Route path = '/signup' element= {<Signup/>}></Route>
                <Route path = '/login' element= {<Signin/>}></Route>
                <Route path = '/' element= {<Signup/>}></Route>
                <Route path = '/addTodo' element= {<AddTodo/>}></Route>
                <Route path = '/todo' element= {<TodoList2/>}></Route>
               
              </Routes>
            </Router>
        </RecoilRoot>
      
    </>
  )
}

export default App
