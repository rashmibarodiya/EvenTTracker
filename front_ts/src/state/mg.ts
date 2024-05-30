// mg.ts
import { atom } from "recoil";
import { Todo } from "../todo/TodoList"

export const userName = atom<string>({ // CHANGED: Specified type <string>
    key: "userName",
    default: ""
});

export const password = atom<string | null>({ // CHANGED: Specified type <string | null>
    key: "password",
    default: null
});

export const todo = atom<Todo[]>({ // CHANGED: Specified type <Todo[]>
    key: "todo",
    default: []
});

export const authState = atom<{ token: string | null, username: string | null }>({ // CHANGED: Specified type <{ token: string | null, username: string | null }>
    key: 'authState',
    default: { token: null, username: null },
});
