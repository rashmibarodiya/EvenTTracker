import { atom } from "recoil";

export const userName = atom({
    key: "userName",
    default: "" // Set default to null initially
});

export const password = atom({
    key: "password",
    default: null // Set default to null initially
});
export const authState = atom({
    key: 'authState',
    default: { token: null, username: null },
  });
