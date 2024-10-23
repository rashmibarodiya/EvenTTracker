import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AddTodo from "./AddTodo";
import { userName, todo } from "../state/mg";

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
                const res = await axios.get(`${url}todo/todo`, {
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
        <div className="p-6 ml-20  ">
            {/* <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {uname}!</h1>
                <button 
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }} 
                    className="text-red-600 hover:text-red-800 transition duration-200"
                >
                    Logout
                </button>
            </div> */}

            <div className="mb-4">
                <AddTodo />
            </div>

            <div className="space-y-4">
                {todos.map((todo) => (
                    <div key={todo._id} className={`p-4 bg-white rounded-lg shadow-md ${todo.done ? 'opacity-50' : ''}`}>
                        <h3 className="text-lg font-semibold">{todo.title}</h3>
                        <p className="text-gray-600 mb-2">{todo.description}</p>
                        <button 
                            onClick={() => markDone(todo._id)} 
                            className={`px-4 py-2 rounded-md text-white ${todo.done ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
                        >
                            {todo.done ? "Done" : "Mark as done"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;
