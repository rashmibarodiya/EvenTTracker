import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { event } from "../state/mg";
import deleteIcon from "../../public/delete.svg"; 

export interface Event {
    title: string;
    description: string;
    done: boolean;
    userId: string;
    _id: string;
}

function EventList() {
    const [events, setEvents] = useRecoilState<Event[]>(event); 
    const url = import.meta.env.VITE_URL;

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await axios.get(`${url}/todo/todo`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                const data: Event[] = res.data; 
                setEvents(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getEvents();
    }, [setEvents]);

    const handleDelete = async(id: string) => {
        try {
            await axios.delete(`${url}/todo/todos/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token")
                }
            });
            setEvents((prevEvents: Event[]) =>
                prevEvents.filter((event: Event) => event._id !== id)
            );
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const markDone = async (id: string) => { 
        try {
            await axios.patch(`${url}/todo/todos/${id}/done`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token")
                }
            });
            setEvents((prevEvents: Event[]) =>
                prevEvents.map((event: Event) =>
                    event._id === id ? { ...event, done: true } : event
                )
            );
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 mx-auto max-w-3xl">
            <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Events</h1>
                {events.map((event) => (
                    <div key={event._id} className={`p-4 bg-gray-100 rounded-lg shadow-lg ${event.done ? 'opacity-50' : ''}`}>
                        <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2">
                            <button 
                                onClick={() => markDone(event._id)} 
                                className={`px-4 py-2 w-full sm:w-auto rounded-md text-white ${event.done ? 'bg-green-600' : 'bg-pink-500 hover:bg-pink-700'} transition duration-200`}
                            >
                                {event.done ? "Done" : "Mark as done"}
                            </button>
                            <button 
                                onClick={() => handleDelete(event._id)} 
                                className="flex items-center px-4 py-2 w-full sm:w-auto rounded-md text-white bg-red-500 hover:bg-red-700 transition duration-200"
                            >
                                <img src={deleteIcon} alt="Delete" className="w-5 h-5 mr-2" />
                               
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventList;
