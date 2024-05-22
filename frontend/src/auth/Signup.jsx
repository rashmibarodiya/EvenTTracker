import {useSetRecoilState} from "recoil"
import {username} from "../state/atom.js"
import {password} from "../state/atom.js"

function Signup(){
    const setUsername= useSetRecoilState(username);
    const setPassword= useSetRecoilState(password);
    const url = "https://miniature-space-umbrella-69vpxrw5rqrqc4qvq-3000.app.github.dev/"

    return (
        <>
        <div>
            <input type="text" placeholder="username" onChange={(e) =>  setUsername(e.target.value)}></input>
            {/* <input type="text" placeholder="password" onChange={(e) =>  setPassword(e.target.value)}></input> */}
            Already Signed up?
            {/* <Link to ="/login">Login</Link>
             <button onClick={(e) => {
                axios.post(`$url` + `auth/signup`
            ).then( (res) =>{
                console.log(res);
                alert("signed up")
            })
             }}>Signup</button> */}
        </div>
        </>
    )

}

export default Signup;