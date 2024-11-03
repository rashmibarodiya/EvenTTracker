// mg.ts
import { atom } from "recoil";

export const title = atom<string>({ 
    key: "title",
    default: ""
});

export const description = atom<string | null>({ 
    key: "description",
    default: null
});

export const reminder = atom<boolean>({ 
    key: "reminder",
    default: true
});

export const date = atom<string | null>({ 
    key: 'date',
    default: null
});
