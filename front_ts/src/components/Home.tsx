
import { useNavigate } from "react-router-dom";
import calendar from "/calendar.svg"; // Corrected path
import add from "/add.svg"; // Corrected path
import email from "/email.svg"; // Corrected path

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-6 mx-auto mt-20 space-y-8 text-center shadow-lg rounded-lg bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700">Welcome to EvenTTracker</h1>
      <p className="text-xl text-gray-700">
        Your one-stop solution to manage all your events seamlessly! With EvenTTracker, stay organized, stay reminded, and never miss an important date again.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        <Feature 
          title="Add Events" 
          image={add}
          description="Easily add events with a simple form, capturing all essential details for meetings, birthdays, or reminders."
          />
        <Feature 
          title="View Events" 
          image={calendar}
          description="Keep track of every upcoming event with ease—view, organize, and set reminders to stay for every task." 
        />
        <Feature 
          title="Get Reminders" 
          image={email}
          description="Stay on top of your plans with customizable reminders—get notified minutes, hours, or days in advance."
        />
      </div>
      <button 
        onClick={() =>{
          if(localStorage.getItem("token")){
            navigate("/events")
          }else{
            navigate("/signup")
          }
        }}
        className="px-8 py-3 mt-4 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-indigo-300"
      >
        Get Started
      </button>
    </div>
  );
}

interface FeatureProp {
  title: string;
  description: string;
  image: string;
}

function Feature({ title, description, image }: FeatureProp) {
  return (
    <div className="p-4 lg:w-72  border rounded-lg bg-gray-100 shadow-sm transform transition-transform duration-300 hover:scale-105">
      <div className="flex items-center gap-4">
       
        <div className="">
          <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <img src={image} alt={title} className="w-16 h-16 mt-5" />
      </div>
    </div>
  );
}
