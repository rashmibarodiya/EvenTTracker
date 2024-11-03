import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import google from "/google.svg"
const url = import.meta.env.VITE_URL;

const Signin = () => {
    console.log("Signup component rendered***********************************", url);
   

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[error,setError] = useState("")


    useEffect(()=>{
        const queryParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = queryParams.get('token')
        if (tokenFromUrl) {
            localStorage.setItem('token', tokenFromUrl);
            console.log("Token set successfully in localStorage"); 
            window.location.href= "/"
        }

    },[])

    const handleSignin = async () => {
        if(!username || !password){
            setError("Please fill the username and password")
            return
        }
        const response = await fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/event";
        } else {
            alert("Error while signing up");
        }
    };

    const handleGoogle = () => {
        window.location.href= `${url}/auth/google`
    }
    return (
        <div className="flex justify-center items-center mt-32 ">
            <div className="bg-gray-100 p-8 rounded-lg shadow-2xl w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome back!</h2>
                <h4 className="text-gray-600 mb-6">Signin below</h4>
                
                <div className="mb-4">
                   
                    <input 
                        type='text' 
                        id="username"
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder='Username' 
                        className="w-full border border-gray-300 p-2 rounded-md focus:rounded-sm focus:outline-none 
                        focus:ring-2 focus:ring-gray-800"
                    />
                </div>
                
                <div className="mb-4">
                    
                    <input 
                        type='password' 
                        id="password"
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder='Password' 
                        className="w-full border border-gray-300 p-2 rounded-md focus:rounded-sm focus:outline-none 
                        focus:ring-2 focus:ring-gray-800"
                    />
                </div>
                
                <button 
                    onClick={handleSignin} 
                    className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-500 transition duration-200"
                >
                    Signin
                </button>
                {error &&(
                    <div className="mb-4 mt-2">
                    <span className="text-red-600"> {error}</span>
                </div>
                )}
                
                
                <div className="mb-4 mt-2">
                    <span className="text-gray-600">Don't have an account? <Link to="/signup" 
                    className="text-blue-800 hover:underline">
                        Register</Link></span>
                </div>
                
                
                <button 
                    onClick={handleGoogle} 
                    className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-500 transition duration-200"
                >
                    <div className='flex justify-center gap-3'>
                    <img src = {google} alt ={"google"}width={25} height={25}></img>
                    Continue with Google
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Signin;
