
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import express from "express";
const app = express();
import passport from 'passport';
import cors from "cors";
import session from 'express-session';
import "./mail/cronJob";
import './auth/passport';
// import { router as authRoute, router } from "./auth";
import authRoute from "./authen"
import todoRoute from "./todo";
import { connectDB } from "./db";

const port = process.env.PORT
const uri: string | undefined = process.env.MONG;


connectDB()
const allowedOrigins = [process.env.FRONT_URL!];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

app.use(express.json());
app.use(session(
    {
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: true
    }
))
app.use("/auth", authRoute);
app.use("/todo", todoRoute);
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.status(200).send({
        msg:"everything great"
    })
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
app.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err:any, user:any, info:any) => {
        if (err) {
            return next(err); 
        }
        if (!user) {
            return res.status(401).json({ error: 'Google Authentication Failed!!' }); // Handle user not found
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
            res.redirect(`${process.env.FRONT_URL}/signup?token=${token}`);
        });
    })(req, res, next);
});




app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

