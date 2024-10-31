
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import  express from "express";
import * as mongoose from "mongoose";
import passport from 'passport';
// import cookieSession from 'cookie-session'
import  cors from "cors";
import session from 'express-session';
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
app.use(session(
    {
        secret:process.env.SESSION_SECRET!,
        resave:false,
        saveUninitialized:true
    }
))
app.use(passport.initialize());
app.use(passport.session());

app.get('auth/google', passport.authenticate('google', {scope : ['profile','email']}))

app.get('auth/google/callback',passport.authenticate(
    'google',{failureRedirect: '/'},
    (req,res) => {
        const token = jwt.sign( {id:(req.user as any).id},process.env.JWT_SECRET!, {expiresIn : '1h'})
        res.json({token})
    }
))
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

