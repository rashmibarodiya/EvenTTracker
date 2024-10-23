// AddTodo.jsx
import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todo } from "../state/mg.js";

function AddTodo() {
    const [title, setTitle] = useState("");
    const [description, setDes] = useState("");
    const setTodos = useSetRecoilState(todo);
    const [error, setError] = useState("");
    const url = import.meta.env.VITE_URL;

    const handleSubmit = async () => {
        if (!title || !description) {
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
        } catch (error) {
            console.error("Error adding todo:", error);
            alert("Failed to add todo");
        }
    };

    return (
        <div className="flex flex-col items-center p-10 w-96 bg-white rounded-lg shadow-lg">
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
