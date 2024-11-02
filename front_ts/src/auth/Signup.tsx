import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
const url = import.meta.env.VITE_URL;
import google from "/google.svg"
interface User {
    displayName: string;
}

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [searchParams] = useSearchParams();
    
    console.log("i am here ")

   
    console.log("this is search paramas ",searchParams);
    useEffect(() => {
        axios.get(`${url}/auth/status`, { withCredentials: true })
            .then(response => setUser(response.data.user))
            .catch(error => console.error("Error fetching user status:", error));

        // Extract token from URL and store it directly in localStorage
        const queryParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = queryParams.get('token') || "";

        if (tokenFromUrl) {
            localStorage.setItem('token', tokenFromUrl);
            console.log("Token set successfully in localStorage"); 
            window.location.href= "/"
        }
    }, []);

    const handleLogin = () => {
        window.location.href = `${url}/auth/google`; 
    };

    const handleLogout = () => {
        window.location.href = `${url}/auth/logout`; 
        localStorage.removeItem('token');
        setUser(null);
        console.log("Token cleared successfully");
        alert("Token cleared successfully");
    };

    const handleSignup = async () => {
        if (!username || !password || !email) {
            setError("Please fill the required fields");
            return;
        }
        try {
            const response = await fetch(`${url}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email }),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "/todo";
            } else {
                alert("Error while signing up");
            }
        } catch (e) {
            console.error("Signup error:", e);
            alert("An error occurred during signup.");
        }
    };

    return (
        <div className="flex justify-center items-center mt-32">
            <div className="bg-gray-100 p-8 rounded-lg shadow-2xl w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome!</h2>
                <h4 className="text-gray-600 mb-6">Signup below</h4>

                <div className="mb-4">
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full border border-gray-300 bg-gray-50 p-2 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                </div>
                
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full border border-gray-300 bg-gray-50 p-2 rounded-md focus:outline-none focus:ring-2 
                        focus:ring-gray-800"
                    />
                </div>

                {error && (
                    <div className="text-red-500 mb-4">
                        {error}
                    </div>
                )}

<button
                    onClick={handleSignup}
                    className="w-full bg-gray-700 text-white p-2  rounded-md hover:bg-gray-600 transition duration-200"
                >
                    Signup
                </button>
                
                <div className="mb-4 mt-2">
                    <span className="text-gray-600">Already signed up? <Link to="/login" className="text-blue-800 hover:underline">Login</Link></span>
                </div>

                <div className="auth-status mb-4">
                    {user ? (
                        <div>
                            <p>Welcome, {user.displayName}!</p>
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
                        </div>
                    ) : (
                        <button onClick={handleLogin} className="bg-gray-700 text-white w-full px-4 py-2 rounded-md
                        hover:bg-gray-600 transition duration-200">
                            <div className='flex justify-center gap-3'>
                            <img src = {google} alt ={"google"}width={25} height={25}></img>
                            Continue with Google
                            </div>
                           </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Signup;
