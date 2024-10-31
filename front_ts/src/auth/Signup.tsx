import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const url = import.meta.env.VITE_URL;
const url2 = import.meta.env.VITE_URL2;


interface User {
    displayName: string
}
const Signup = () => {
    console.log("Signup component rendered***********************************", url);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("")

    const [user, setUser] = useState<User>();

    useEffect(() => {
        axios.get(`${url}/auth/status`, { withCredentials: true })
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.error("Error fetching user status:", error);
            });
    }, []);

    const handleLogin = async () => {
        try {
            window.location.href = `${url}/auth/google`; 
            const queryParams = new URLSearchParams(window.location.search);
            const token = queryParams.get('token');

            if (token) {
                localStorage.setItem('token', token);
                console.log("Token set successfully");
                alert("Token set successfully");
            }
        } catch (e) {
            console.log("something went wrong in google auth")
            alert(e)
        }
    };

    const handleLogout = async () => {
        try {
            window.location.href = `${url}/auth/logout`; 
            localStorage.setItem('token', "")
            console.log("token clear succuessfully")
            alert("token clear successfully")

        } catch (e) {
            alert(e)
        }
    };


    const handleSignup = async () => {
        const response = await fetch(`${url}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
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

                    <input
                        type='email'
                        id="password"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        className="w-full border border-gray-300 bg-gray-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="auth-status">
                    {user ? (
                        <div>
                            <p>Welcome, {user.displayName}!</p>
                            <button onClick={handleLogout} className="btn-logout">Logout</button>
                        </div>
                    ) : (
                        <button onClick={handleLogin} className="btn-login">Login with Google</button>
                    )}
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
