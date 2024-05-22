import {atom} from 'recoil'

 export const username = atom ({
    key : "username",
     default : {token : null ,username :null}
})
 export const password = atom ({
    key : "password",
     default : {token : null ,passwprd :null}
})

