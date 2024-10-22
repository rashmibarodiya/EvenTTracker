"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const db_1 = require("./db");
const port = process.env.PORT;
console.log("this is url ", process.env.URL);
const auth_1 = require("./auth");
const todo_1 = __importDefault(require("./todo"));
const uri = process.env.MONG;
const cors_1 = __importDefault(require("cors"));
(0, db_1.connectDB)();
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
mongoose.connect(`${uri}`, { dbName: "todos" });
