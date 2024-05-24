import axios from "axios";
import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
//import {username}  from "../state/atom.js";
import { useRecoilValue } from "recoil";

function TodoList() {
    const [todos, setTodos] = useState([]);
    //const uname = useRecoilValue(username);
     
    const url = "https://miniature-space-umbrella-69vpxrw5rqrqc4qvq-3000.app.github.dev";

    useEffect(() => {
        const getTodos = async () => {
            try {
                const res = await axios.get(`${url}/todo/todo`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                console.log(res);
                setTodos(res.data); // Ensure res.data is an array of todos
                alert("Todo retrieved");
            } catch (error) {
                console.error("Error:", error);
                alert("Todo retrieve failed");
            }
        };

        getTodos();
    }, [url]);

    const markDone = async (id) => {
        try {
            const res = await axios.patch(`${url}/todo/todos/${id}/done`, {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(res);
            // Update the specific todo item to be marked as done
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id ? { ...todo, done: true } : todo
                )
            );
            alert("Todo updated");
        } catch (error) {
            console.error("Error:", error);
            alert("Todo update failed");
        }
    };

    return (
        <>
            {/* <div>
                Welcome {uname}!
            </div> */}
           
            <div style={{ marginLeft: 20 }}>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }}
                >
                    Logout
                </button>
            </div>

            <div>
                <AddTodo />
            </div>

            <div>
                {todos.map((todo) => (
                    <div key={todo._id}>
                        <h4>{todo.title}</h4>
                        <p>{todo.description}</p>
                        <button onClick={() => markDone(todo._id)}>
                            {todo.done ? "Done" : "Mark as done"}
                        </button>
                    </div>
                ))}
            </div> 
            jkghshdsljkhalkjfh
        </>
    );
}

export default TodoList;
