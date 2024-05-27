// TodoList.jsx
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AddTodo from "./AddTodo";
import { userName, todo } from "../state/mg.js";

function TodoList() {
    const [todos, setTodos] = useRecoilState(todo); // CHANGED: Use Recoil state
    const uname = useRecoilValue(userName);
    const url = "https://miniature-space-umbrella-69vpxrw5rqrqc4qvq-3000.app.github.dev/";

    useEffect(() => {
        const getTodos = async () => {
            try {
                const res = await axios.get(`${url}todo/todo`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                const data = await res.data;
                setTodos(data);
                console.log("data", data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getTodos();
    }, [setTodos]); // CHANGED: Add setTodos to the dependency array

    const markDone = async (id) => {
        try {
            await axios.patch(`${url}todo/todos/${id}/done`, {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
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
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>Welcome {uname}!</div>
                <div style={{ marginLeft: 20 }}>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        window.location = "/login";
                    }}>
                        Logout
                    </button>
                </div>
            </div >
            <div><AddTodo /></div>
            <br />
            <div>


                {todos.map((todo) => (
                    <div key={todo._id}>
                        <b> {todo.title}</b>
                        <div style={{ display : "flex",
                            justifyContent: "space-evenly"

                        }} >
                            <div/>
                            <div/>
                            <div/>
                            
                            {todo.description}
                            
                            <button onClick={() => markDone(todo._id)}>
                                {todo.done ? "Done" : "Mark as done"}
                            </button>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TodoList;
