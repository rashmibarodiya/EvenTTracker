import axios from "axios";
import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import { userName } from "../state/mg.js";
import { useRecoilValue } from "recoil";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const uname = useRecoilValue(userName); // Get the username from Recoil state
    const url = "https://miniature-space-umbrella-69vpxrw5rqrqc4qvq-3000.app.github.dev/";
    useEffect(() => {
        if (!uname) return;

        const getTodos = async () => {
            try {
                const res = await axios.get(`${url}/todo/todo`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                const data =  res.data;
                setTodos(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getTodos();
    }, [uname]);

    const addTodo = async ()=> {
            // try{
                const res =  axios.post(`${url}/todo/addTodo`,{},{
                    headers:{
                        Authorization : "Bearer "+ localStorage.getItem("token")
                    }
                });
                const data = await res.data
                setTodos([...todos, data]);
        alert("todo aDDED")
            // }catch (e)  {

            // }
        }

    const markDone = async (id) => {
        try {
            const res = await axios.patch(`${url}/todo/todos/${id}/done`, {}, {
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

    // if (!uname) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <div>Welcome {uname}!</div>
            <div style={{ marginLeft: 20 }}>
                <button onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                }}>
                    Logout
                </button>
            </div>
            <div><AddTodo /></div>
            <div>
                {/* {todos.map((todo) => (
                    // <div key={todo._id}>
                    //     <h4>{todo.title}</h4>
                    //     <div style={{ display: "flex", justifyContent: "space-between" }}>
                    //         {todo.description}
                    //         <button onClick={() => markDone(todo._id)}>
                    //             {todo.done ? "Done" : "Mark as done"}
                    //         </button>
                    //     </div>
                    // </div>
                ))} */}
            </div>
        </>
    );
}

export default TodoList;
