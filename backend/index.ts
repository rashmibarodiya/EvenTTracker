


import  express from "express";
import * as mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
import { connectDB } from "./db";
const port = process.env.PORT
console.log("this is url ", process.env.URL)

import { router as authRoute, router } from "./auth";
import todoRoute from "./todo";
const uri: string | undefined = process.env.MONG;



import  cors from "cors";
connectDB()
app.use(cors())
app.use(express.json());
console.log(process.env.MONG);
 app.use("/auth", router);
app.use("/todo", todoRoute);


// app.use("/auth", authRoute);
// app.use("/todo", todoRoute);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
// const authRoute = require("./auth").router;
// const todoRoute = require("./todo");
// Adjust the mongoose connection string as needed
 mongoose.connect(`${uri}`, { dbName: "todos" });
