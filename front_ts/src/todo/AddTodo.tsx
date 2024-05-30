// AddTodo.jsx
import axios from "axios";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userName, todo } from "../state/mg.js";

function AddTodo() {
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const setTodos = useSetRecoilState(todo); // CHANGED: Renamed variable for clarity
    const uname = useRecoilValue(userName);
    const url = "https://miniature-space-umbrella-69vpxrw5rqrqc4qvq-3000.app.github.dev/";

    return (
        <>
            <div>Add todo</div>
            <div>
                Title :
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                Description :
                <input type="text" placeholder="Description" onChange={(e) => setDes(e.target.value)} />
            </div>
            <button onClick={() => {
                axios.post(`${url}todo/addTodo`, {
                    title: title,
                    description: des
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then((res) => {
                    console.log(res);
                    alert("todo added");

                    setTodos((oldTodos) => [...oldTodos, res.data]); // CHANGED: Update Recoil state with new todo
                });
            }}>Submit</button>
        </>
    );
}

export default AddTodo;
