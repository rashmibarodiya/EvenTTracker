import  {  useState, useEffect } from 'react';
import { authState } from '../state/mg.js';
import {useRecoilValue} from "recoil";
import Todo from '../types/Todo';

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const authStateValue = useRecoilValue(authState);
    const url = process.env.URL!

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch(`${url}todo/todo`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            // Todo: Create a type for the response that you get back from the server
            const data = await response.json();
            setTodos(data);
        };
        getTodos();
    }, [authState]);

    const addTodo = async () => {
        const response = await fetch(`${url}todo/addTodo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
        alert("todo aDDED")
    };

    const markDone = async (id:string) => {
        const response = await fetch(`${url}todo/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo :Todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };

    return (
        <div>
            <div style={{display: "flex"}}>
                <h2>Welcome {authStateValue.username}</h2>
                <div style={{marginTop: 25, marginLeft: 20}}>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}>Logout</button>
                </div>
            </div>
            <h2>Todo List</h2>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <button onClick={addTodo}>Add Todo</button>
            {todos.map((todo  :Todo) => (
                <div key={todo._id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;