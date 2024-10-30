// AddTodo.jsx
import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todo } from "../state/mg.js";
// import notification from "../../public/notification.svg"; 

function AddTodo() {
    const [title, setTitle] = useState("");
    const [description, setDes] = useState("");
    const [date, setDate] = useState("")
    const [reminder , setReminder] =useState(true)
    const setTodos = useSetRecoilState(todo);
    const [error, setError] = useState("");


    const url = import.meta.env.VITE_URL;

    const handleSubmit = async () => {
        if (!title || !description || !date) {
            setError("Please fill the title and description");
            return; // Early return if fields are empty
        }
        setError(""); // Clear previous errors

        try {
            const response = await axios.post(
                `${url}/todo/addTodo`,
                {
                    title: title,
                    description: description,
                    date:date,
                    setReminder: reminder
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            console.log(response);
            alert("Todo added");
            setTodos((oldTodos) => [...oldTodos, response.data]);

            // Clear input fields after successful submission
            setTitle("");
            setDes("");
            setDate("")
            setReminder(true)
        } catch (error) {
            console.error("Error adding todo:", error);
            alert("Failed to add todo");
        }
    };

    return (
        <div className="ml-96 p-10 w-96 bg-gray-100 rounded-lg shadow-2xl mt-32">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Todo</h2>
            <div className="mb-4 w-full">
                <input
                    type="text"
                    id="title"
                    placeholder="Enter title"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4 w-full">
                <input
                    type="text"
                    id="description"
                    placeholder="Enter description"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={description}
                    onChange={(e) => setDes(e.target.value)}
                />
            </div>
            <div className="flex justify-between gap-4">
            <div className="mb-4 w-full">
                <input
                    type="text"
                    id="date"
                    placeholder="YYYY-MM-DD"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            

            <button 
                            onClick={() => setReminder(!reminder)} 
                            className={`px-4  rounded-md text-white hover:bg-yellow-700
                             transition duration-200 ${reminder? 'bg-green-500':'bg-red-600'}`}
                        >notification
                          {/* <img src= {notification} alt="notification" className="text-white w-5 h-5" /> */}
                        </button>
            </div>
            
            <button
                onClick={handleSubmit}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
                Submit
            </button>
            {error && (
                <div className="mt-2 text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
}

export default AddTodo;
