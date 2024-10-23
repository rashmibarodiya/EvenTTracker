// mg.ts
import { atom } from "recoil";
import { Todo } from "../todo/TodoList"
import { Auth } from "../types/Todo";

export const userName = atom<string>({ 
    key: "userName",
    default: ""
});

export const password = atom<string | null>({ 
    key: "password",
    default: null
});

export const todo = atom<Todo[]>({ 
    key: "todo",
    default: []
});

export const authState = atom<Auth>({ 
    key: 'authState',
    default: { token: "", username: "" },
});
