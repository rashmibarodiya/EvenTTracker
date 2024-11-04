import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { event } from "../state/mg";
import deleteIcon from "/delete.svg";
import { useNavigate } from "react-router-dom";
import nodata from "/nodata.svg";
import notification from "/notification.svg";
import edit from "/edit.svg";

export interface Event {
    title: string;
    description: string;
    done: boolean;
    userId: string;
    date: string,
    setReminder: boolean;
    _id: string;
}

function EventList() {
    const [events, setEvents] = useRecoilState<Event[]>(event);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    
    const url = import.meta.env.VITE_URL;

    const navigate = useNavigate();

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await axios.get(`${url}/todo/todo`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setEvents(res.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getEvents();
    }, [setEvents]);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${url}/todo/todos/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const markDone = async (id: string) => {
        try {
            await axios.patch(`${url}/todo/todos/${id}/done`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === id ? { ...event, done: true } : event
                )
            );
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 ">
            <div className=" bg-gray-100">
                {events.length > 0 ? (
                    <div className="space-y-4  bg-white">
                        <h1 className="text-2xl p-4  font-bold text-gray-800 mb-6">Your Events</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-9">
                            {events.map((event) => (
                                <div
                                    key={event._id}
                                    className={`p-4 w-full sm:w-[95%] bg-gray-100 hover:scale-105 rounded-lg shadow-lg ${event.done ? "opacity-50" : ""}`}
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                                    <p className="text-gray-600 mb-4">{event.description}</p>
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-center  gap-2">
                                        <button
                                            onClick={() => markDone(event._id)}
                                            className={`px-4 py-2 w-full sm:w-auto rounded-md text-white ${event.done ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
                                                } transition duration-200`}
                                        >
                                            {event.done ? "Done" : "Mark as done"}
                                        </button>
                                        {/* update goes here  */}
                                        <div className="flex justify-between gap-2">


                                            <button
                                                onClick={() => setSelectedEvent(event)}
                                                className="flex items-center px-4 py-2 w-full sm:w-auto rounded-md text-white bg-gray-500 hover:bg-gray-700 transition duration-200"
                                            >
                                                <img src={edit} alt="edit" className="w-5 h-5 mr-2" />
                                            </button>


                                            {/* ends here */}
                                            <div className={`${event.setReminder ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded-md`}>
                                                <img src={notification} alt="notification"
                                                    className="sm:w-8 sm:h-8 lg:w-6 lg:h-6 " />

                                            </div>
                                            <button
                                                onClick={() => handleDelete(event._id)}
                                                className="flex items-center px-4 py-2 w-full sm:w-auto rounded-md text-white bg-red-500 hover:bg-red-700 transition duration-200"
                                            >
                                                <img src={deleteIcon} alt="Delete" className="w-5 h-5 mr-2" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-4 rounded-lg bg-gray-200">
                        <div className="flex flex-col items-center justify-center text-2xl">
                            <p className="text-center">Oops! It seems you haven't created any events yet.</p>
                            <img src={nodata} alt="No events" className="w-96 h-96" />
                        </div>
                        <button
                            onClick={() => navigate("/addEvent")}
                            className="bg-gray-700 p-4 text-white hover:bg-gray-600 rounded-md"
                        >
                            Add Event
                        </button>
                    </div>
                )}
            </div>
            {selectedEvent && (
                <Update
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onSave={(updatedEvent) => {
                        setEvents((prevEvents) =>
                            prevEvents.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
                        );
                        setSelectedEvent(null);
                    }}
                />
            )}
        </div>
    );
}

interface UpdateProps {
    event: Event;
    onClose: () => void;
    onSave: (updatedEvent: Event) => void;
}

function Update({ event, onClose, onSave }: UpdateProps) {
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [date, setDate] = useState(event.date.split("T")[0]);
    const [reminder, setReminder] = useState(event.setReminder);
    const [loading, setLoading] = useState(false)
    const url = import.meta.env.VITE_URL;

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`${url}/todo/todos/edit/${event._id}`, {
                title,
                description,
                date,
                setReminder: reminder,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            onSave(res.data);
            setLoading(false)
        } catch (error) {
            console.error("Something went wrong when updating event", error);
            setLoading(false)
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black
         bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Event</h2>
                <input
                    type="text"
                    placeholder="Enter title"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter description"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
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
                        className={`px-4 rounded-md text-white hover:bg-yellow-700 transition duration-200 ${reminder ? 'bg-green-500' : 'bg-red-600'
                            }`}
                    >
                        <img src={notification} alt="notification"
                            className="text-white w-6 h-6 md:w-8 md:h-10" />
                    </button>
                </div>
                <button onClick={handleSubmit} className="w-full py-2 bg-gray-800 text-white rounded-md mb-2">

                    {loading ? (

                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid 
                        border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
                <button onClick={onClose} className="w-full py-2 bg-gray-400 text-white rounded-md">Close</button>
            </div>
        </div>

    );
}

export default EventList;
