import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from './todo/TodoList';
import Signup from './auth/Signup';
import axios from 'axios';

const AppBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const url = import.meta.env.VITE_URL;

    // Check for token in localStorage
    useEffect(() => {
        const getMe = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get(`${url}/auth/me`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    if (res.data.username) {
                        setIsAuthenticated(true);
                        setUsername(res.data.username);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (err:any) {
                    if (err.response) {
                        console.error('Error fetching user data:', err.response.data);
                    } else {
                        console.error('Error:', err.message);
                    }
                    setIsAuthenticated(false);
                }
            }
        };
        getMe();
    }, [url]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <div className="bg-gray-100 p-10 rounded-lg shadow-md ">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo App</h1>
            {isAuthenticated ? (
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Welcome, {username}!</span>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="mb-4">
                    <span className="text-gray-600 ">Please sign up or log in.</span>
                </div>
            )}
            <div>
                {isAuthenticated ? <TodoList /> : <Signup />}
            </div>
        </div>
    );
};

export default AppBar;
