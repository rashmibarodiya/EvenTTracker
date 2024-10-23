import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const url = import.meta.env.VITE_URL;

    useEffect(() => {
        const getMe = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get(`${url}/auth/me`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (res.data.username) {
                        setIsAuthenticated(true);
                        setUsername(res.data.username);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (err: any) {
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
        <div className="flex justify-between items-center bg-gray-100 p-8 shadow-md rounded-lg">
            <div>
            <h1 className="text-2xl font-bold text-gray-800 md-32">Todo App</h1>
            <span className="text-gray-600 mt-8">Welcome, {username}!</span>
            </div>
            
            {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                    
                    <button
                        onClick={() => {
                            navigate('/addTodo')
                        }}
                        className="border rounded-md px-4 py-2 text-slate-900 hover:bg-gray-200 transition duration-200"
                    >
                        Add Todo
                    </button>
                    <button
                        onClick={() => {
                            navigate('/todo')
                        }}
                        className="border rounded-md px-4 py-2 text-slate-900 hover:bg-gray-200 transition duration-200"
                    >
                        Get Todo
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate('/signup')}
                        className="border rounded-md px-4 py-2 text-slate-900 hover:bg-gray-200 transition duration-200"
                    >
                        Signup
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="border rounded-md px-4 py-2 text-slate-900 hover:bg-gray-200 transition duration-200"
                    >
                        Signin
                    </button>
                </div>
            )}
        </div>
    );
};

export default AppBar;
