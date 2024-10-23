import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from './todo/TodoList';
import Signup from './auth/Signup';
import './App.css';
import axios from 'axios';

const AppBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); // Use navigate for programmatic navigation
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

                    // If username is present in the response data
                    if (res.data.username) {

                        setIsAuthenticated(true);
                        setUsername(res.data.username);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (err: any) {
                    if (err.response) {
                        console.error('Error fetching user data:', err.response.data); // Server responded with an error
                    } else {
                        console.error('Error:', err.message); // Network issues or other errors
                    }
                    setIsAuthenticated(false);
                }
            }
        };
        getMe();
    }, [url]); // Added url as a dependency

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/'); // Navigate to the root after logout
    };

    return (
        <div>
            <div>
                <h1>Todo App</h1>
                {isAuthenticated && (
                    <div>
                        <span>Welcome, {username}!</span>
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Conditional Rendering: Render TodoList or Signup based on authentication */}
            <div>
                {isAuthenticated ? <TodoList /> : <Signup />}
            </div>
        </div>
    );
};

export default AppBar;
