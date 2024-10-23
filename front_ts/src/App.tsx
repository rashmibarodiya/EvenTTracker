
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import AddTodo from './todo/AddTodo'
//import TodoList2 from './todo/TodoList2'
import TodoList from './todo/TodoList'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import './App.css'

function App() {
 
  return (
    <>
           hello world
        <RecoilRoot>
        <Signup></Signup>
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
      
    </>
  )
}

export default App
