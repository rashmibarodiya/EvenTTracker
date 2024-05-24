import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import AddTodo from './todo/AddTodo'
import TodoList from './todo/TodoList'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import './App.css'

function App() {
 
  return (
    <>
      <div>     
        <RecoilRoot>
        {/* <Signup></Signup> */}
            <Router>
              <Routes>
                <Route path = '/signup' element= {<Signup/>}></Route>
                <Route path = '/login' element= {<Signin/>}></Route>
                <Route path = '/' element= {<Signup/>}></Route>
                <Route path = '/addTodo' element= {<AddTodo/>}></Route>
                <Route path = '/todo' element= {<TodoList/>}></Route>
               
              </Routes>
            </Router>
        </RecoilRoot>
        </div>
    </>
  )
}

export default App
