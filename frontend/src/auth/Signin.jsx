import { useRecoilState } from "recoil";
import { username, password } from "../state/atom.js";
import { Link } from "react-router-dom";
import axios from "axios";

function Signin(){
    const [usernameValue, setUsername] = useRecoilState(username);
    const [passwordValue, setPassword] = useRecoilState(password);
    const url = "https://miniature-space-umbrella-69vpxrw5rqrqc4qvq-3000.app.github.dev/";

    return (
        <>
         <div>
            welcome back!! Signin below
            <br/>

           Username : 
           <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <br />
           Password :
            <input
                type="password" // Changed to password type for better UX
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            Not Signed up?
             {/* <Link to="/login">Login</Link> */}
            <br />
             <button
                onClick={() => {
                    axios.post(`${url}auth/login`, {
                        username: usernameValue,
                        password: passwordValue,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then((res) => {
                        console.log(res);
                        localStorage.setItem("token", res.data.token)
                        alert("signin successfully");
                    }).catch((error) => {
                        console.error("Error:", error);
                        alert("signin failed");
                    });
                }}
            > 
           Signin
            </button>
            </div>

            </>
    )

}

export default Signin;