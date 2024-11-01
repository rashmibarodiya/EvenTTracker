// mg.ts
import { atom } from "recoil";
import { Event } from "../event/Events"
import { Auth } from "../types/Event";

export const userName = atom<string>({ 
    key: "userName",
    default: ""
});

export const password = atom<string | null>({ 
    key: "password",
    default: null
});

export const event = atom<Event[]>({ 
    key: "event",
    default: []
});

export const authState = atom<Auth>({ 
    key: 'authState',
    default: { token: "", username: "" },
});
