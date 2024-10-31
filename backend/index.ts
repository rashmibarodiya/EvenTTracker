
import dotenv from 'dotenv';
dotenv.config();

import  express from "express";
import * as mongoose from "mongoose";

import  cors from "cors";

import "./mail/cronJob";


const app = express();
import { connectDB } from "./db";
const port = process.env.PORT
console.log("this is url ", process.env.URL)

import { router as authRoute, router } from "./auth";
import todoRoute from "./todo";
const uri: string | undefined = process.env.MONG;




connectDB()
app.use(cors())
app.use(express.json());
console.log(process.env.MONG);
 app.use("/auth", router);
app.use("/todo", todoRoute);

console.log("Email:", process.env.MAIL); // Log Email
console.log("Password:", process.env.PASS ? "Loaded" : "Not set"); // Log Password

console.log("Mongo URI:", process.env.MONG);

// app.use("/auth", authRoute);
// app.use("/todo", todoRoute);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

