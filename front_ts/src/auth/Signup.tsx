import { useState } from 'react';
import { Link } from 'react-router-dom';

const url = import.meta.env.VITE_URL;

const Signup = () => {
    console.log("Signup component rendered***********************************", url);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        const response = await fetch(`${url}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/todo";
        } else {
            alert("Error while signing up");
        }
    };

    return (
        <div className="flex justify-center items-center mt-32">
            <div className="bg-gray-100 p-8 rounded-lg shadow-2xl w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome!</h2>
                <h4 className="text-gray-600 mb-6">Signup below</h4>
                
                <div className="mb-4">
                   
                    <input 
                        type='text' 
                        id="username"
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder='Username' 
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                
                <div className="mb-4">
                    
                    <input 
                        type='password' 
                        id="password"
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder='Password' 
                        className="w-full border border-gray-300 bg-gray-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                
                <div className="mb-4">
                    <span className="text-gray-600">Already signed up? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></span>
                </div>
                
                <button 
                    onClick={handleSignup} 
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Signup
                </button>
            </div>
        </div>
    );
};

export default Signup;
