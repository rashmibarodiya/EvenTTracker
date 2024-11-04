// AddTodo.jsx
import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { event } from "../state/mg.js";
import notification from "../../public/notification.svg";

function AddEvent() {
    const [title, setTitle] = useState("");
    const [description, setDes] = useState("");
    const [date, setDate] = useState("")
    const [reminder, setReminder] = useState(true)
    const[loading,setLoading] = useState(false)
    const setEvents = useSetRecoilState(event);
    const [error, setError] = useState("");


    const url = import.meta.env.VITE_URL;

    const handleSubmit = async () => {
        if (!title || !description || !date) {
            setError("Please fill the title and description");
            return; // Early return if fields are empty
        }
        setLoading(true)
        setError(""); // Clear previous errors

        try {
            const response = await axios.post(
                `${url}/todo/addTodo`,
                {
                    title: title,
                    description: description,
                    date: date,
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
            
            
            setEvents((oldEvents) => [...oldEvents, response.data]);

            // Clear input fields after successful submission
            setTitle("");
            setDes("");
            setDate("")
            setReminder(true)
            setLoading(false)
            alert("Event added");
           
        } catch (error) {
            console.error("Error adding event:", error);
            setLoading(false)
            alert("Failed to add event");
        }
    };

    return (
        <div className="mx-auto p-6 sm:p-8 md:p-10 w-full lg:w-96 max-w-md bg-gray-100 rounded-lg shadow-2xl mt-8 sm:mt-20 md:mt-32">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Add Event</h2>
        <div className="mb-4 w-full">
            <input
                type="text"
                id="title"
                placeholder="Enter title"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className="mb-4 w-full">
            <input
                type="text"
                id="description"
                placeholder="Enter description"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={description}
                onChange={(e) => setDes(e.target.value)}
            />
        </div>
        <div className="flex justify-between gap-4 mb-4">
            <input
                type="text"
                id="date"
                placeholder="YYYY-MM-DD"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button
                onClick={() => setReminder(!reminder)}
                className={`px-4 rounded-md text-white hover:bg-yellow-700 transition duration-200 ${
                    reminder ? 'bg-green-500' : 'bg-red-600'
                }`}
            >
                <img src={notification} alt="notification" className="text-white w-6 h-6 md:w-8 md:h-10" />
            </button>
        </div>
        <button
            onClick={handleSubmit}
            className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition duration-200"
        >
            {loading?
            (
                <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid 
                        border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"></div>
           
            ):(" Submit")}
        </button>
        {error && (
            <div className="mt-2 text-red-500">
                {error}
            </div>
        )}
    </div>
    
    );
}

export default AddEvent;
