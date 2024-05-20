const express = require("express")
const mongoose = require("mongoose")
const app = express();
const port  = 3000;
const authRoute = require("./auth")
const todoRoute = require("./todo")

app.listen(port,() => {
    console.log("app is running now")
})

app.use("/auth",authRoute);
app.use("/todo",todoRoute);


//mongoose.connect({uri}, '/todos',{dbName : "todos"})