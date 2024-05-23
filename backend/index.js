const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const authRoute = require("./auth").router;
const todoRoute = require("./todo");
const uri = process.env.MONG
const cors = require("cors"); // Add this line
app.use(cors())
app.use(express.json());
console.log(process.env.CHECK);
console.log(process.env.MONG);


app.use("/auth", authRoute);
app.use("/todo", todoRoute);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

// Adjust the mongoose connection string as needed
 mongoose.connect(`${uri}`, { dbName: "todos" });
