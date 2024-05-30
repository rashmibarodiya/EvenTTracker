"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 3000;
const auth_1 = require("./auth");
const todo_1 = __importDefault(require("./todo"));
const uri = process.env.MONG;
const cors_1 = __importDefault(require("cors")); // Add this line
app.use((0, cors_1.default)());
app.use(express_1.default.json());
console.log(process.env.MONG);
app.use("/auth", auth_1.router);
app.use("/todo", todo_1.default);
// app.use("/auth", authRoute);
// app.use("/todo", todoRoute);
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
// const authRoute = require("./auth").router;
// const todoRoute = require("./todo");
// Adjust the mongoose connection string as needed
mongoose_1.default.connect(`${uri}`, { dbName: "todos" });
