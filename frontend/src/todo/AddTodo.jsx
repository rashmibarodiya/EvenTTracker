import axios from "axios";
import { useState } from "react"


function AddTodo() {
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("")
    // console.log(localStorage.getItem("token"))
    const url = "https://miniature-space-umbrella-69vpxrw5rqrqc4qvq-3000.app.github.dev/";
    return (
        <>
            <div>
                Add todo
            </div>
            <div>
                Title :
                <input type="text" placeholder="Title" onChange={(e) => {
                    setTitle(e.target.value)
                }}></input>
            </div>
            <div>
                Description :
                <input type="text" placeholder="Description" onChange={(e) => {
                    setDes(e.target.value)
                }}></input>
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
                    alert("todo added")
                })
            }}>Submit</button>
        </>
    )
}

export default AddTodo;