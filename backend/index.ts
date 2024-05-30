


import express from "express";
import mongoose from "mongoose";
const app = express();
const port : number = 3000;

import { router as authRoute, router } from "./auth";
import todoRoute from "./todo";
const uri: string | undefined = process.env.MONG;
import  cors from "cors"; // Add this line
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
