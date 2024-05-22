import {useSetRecoilState} from "recoil"
import {username} from "../state"

function Signup(){
    const setUsername= useSetRecoilState(username);

    return (
        <>
        <div>
            
        </div>
        </>
    )

}

export default Signup;