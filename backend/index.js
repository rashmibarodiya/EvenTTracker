const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const authRoute = require("./auth").router;
const todoRoute = require("./todo");

app.use(express.json());

app.use("/auth", authRoute);
app.use("/todo", todoRoute);

app.listen(port, () => {
    console.log("App is running now");
});

// Adjust the mongoose connection string as needed
// mongoose.connect(uri, { dbName: "todos" });
