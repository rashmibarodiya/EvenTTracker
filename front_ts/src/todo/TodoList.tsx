import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
// import AddTodo from "./AddTodo";
import { userName, todo } from "../state/mg";

import deleteIcon from "../../public/delete.svg"; 


export interface Todo {
    title: string;
    description: string;
    done: boolean;
    userId: string;
    _id: string;
}

function TodoList() {
    const [todos, setTodos] = useRecoilState<Todo[]>(todo); 
    const uname = useRecoilValue(userName);
    const url = import.meta.env.VITE_URL;

    useEffect(() => {
        const getTodos = async () => {
            try {
                const res = await axios.get(`${url}/todo/todo`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                const data: Todo[] = res.data; 
                setTodos(data);
                console.log("data", data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getTodos();
    }, [setTodos]);

    const handleDelete = async(id:string) => {
        try {
            await axios.delete(`${url}/todo/todos/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token")
                }
            });
            // Remove the deleted todo from the state
            setTodos((prevTodos: Todo[]) =>
                prevTodos.filter((todo: Todo) => todo._id !== id)
            );
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const markDone = async (id: string) => { 
        try {
            await axios.patch(`${url}/todo/todos/${id}/done`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token")
                }
            });
            setTodos((prevTodos: Todo[]) =>
                prevTodos.map((todo: Todo) =>
                    todo._id === id ? { ...todo, done: true } : todo
                )
            );
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-6 ml-20">
            <div className="space-y-8">
               <h1>Your Todos</h1>
                {todos.map((todo) => (
                    <div key={todo._id} className={`p-4 bg-gray-100 w-96 rounded-lg shadow-xl ${todo.done ? 'opacity-50' : ''}`}>
                        <h3 className="text-lg text-black font-semibold">{todo.title}</h3>
                        <p className="text-gray-600 mb-2">{todo.description}</p>
                        <div className="flex justify-between" >

                        <button 
                            onClick={() => markDone(todo._id)} 
                            className={`px-4 py-2 rounded-md text-white ${todo.done ? 'bg-green-600' : 'bg-pink-500 hover:bg-blue-700'} transition duration-200`}
                        >
                            {todo.done ? "Done" : "Mark as done"}
                        </button>
                        <button 
                            onClick={() => handleDelete(todo._id)} 
                            className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-700
                             transition duration-200"
                        >
                          <img src= {deleteIcon} alt="Delete" className="text-white w-5 h-5" />
                        </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;
