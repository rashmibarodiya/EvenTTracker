// TodoList.tsx
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AddTodo from "./AddTodo";
import { userName, todo } from "../state/mg";

export interface Todo {
    title: string; // CHANGED: Corrected type from String to string
    description: string;
    done: boolean;
    userId: string; // CHANGED: Corrected type from String to string
    _id: string; // CHANGED: Corrected type from String to string
}

function TodoList() {
    const [todos, setTodos] = useRecoilState<Todo[]>(todo); 
    const uname = useRecoilValue(userName);
    const url = process.env.URL!
    useEffect(() => {
        const getTodos = async () => {
            try {
                const res = await axios.get(`${url}todo/todo`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                const data: Todo[] = res.data; // CHANGED: Correctly typing response data
                setTodos(data);
                console.log("data", data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getTodos();
    }, [setTodos]);

    const markDone = async (id: string) => { // CHANGED: Corrected type from String to string
        try {
            await axios.patch(`${url}todo/todos/${id}/done`, {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
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

    console.log(todos);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Welcome {uname}!</div>
                <div style={{ marginLeft: 20 }}>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}>
                        Logout
                    </button>
                </div>
            </div>
            <div><AddTodo /></div>
            <br />
            <div>
                {todos.map((todo) => (
                    <div key={todo._id}>
                        <b>{todo.title}</b>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <div />
                            <div />
                            <div />
                            {todo.description}
                            <button onClick={() => markDone(todo._id)}>
                                {todo.done ? "Done" : "Mark as done"}
                            </button>
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TodoList;
