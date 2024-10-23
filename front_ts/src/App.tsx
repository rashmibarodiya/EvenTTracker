
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import AddTodo from './todo/AddTodo'
import TodoList2 from './todo/TodoList2'
import TodoList from './todo/TodoList'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import AppBar from "./Appbar"
import './App.css'

function App() {
 
  return (
    <>
          

           
        <RecoilRoot>
       
            <Router>
            <AppBar/>
              <Routes>
                <Route path = '/signup' element= {<Signup/>}></Route>
                <Route path = '/login' element= {<Signin/>}></Route>
                {/* <Route path = '/' element= {<AppBar/>}></Route> */}
                <Route path = '/addTodo' element= {<AddTodo/>}></Route>
                <Route path = '/todo' element= {<TodoList/>}></Route>
                {/* <Route path = '/todos' element= {<TodoList2/>}></Route> */}
               
              </Routes>
            </Router>
        </RecoilRoot>
      
    </>
  )
}

export default App
