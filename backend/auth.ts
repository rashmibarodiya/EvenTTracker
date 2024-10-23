import * as jwt from "jsonwebtoken";
import * as express from "express";
const secret = "arabi";
import { User,connectDB } from './db';
export const router = express.Router();
import { Request, Response, NextFunction } from "express";



export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    //console.log("hi authen")
    if (authHeader) {
        //    console.log("auth  "+authHeader)
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                console.log("token is not valid")
                return res.status(403).send("Token is not valid");
            }
            if (user && typeof user !== "string") {
                req.headers["userId"] = user.id
                //  req.userId = user.id; // the id is given in jwt.sign in login and signup and it is equal to  _id 
                next();
            } else {
                res.sendStatus(403)
            }
        });
    } else {
        res.status(401).send("Token not provided");
    }
};

router.post('/signup', async (req, res) => {
    console.log("i am in")
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log("kaboom")
    if (user) {
        console.log("user already exits",user)
        
        return res.status(403).send("User already exists");
    }
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });
    console.log("user signed up successfully")
    res.json({
        message: "User created successfully", token
    });
});

router.post('/login', async (req, res) => {
    console.log("in login")
    const { username, password } = req.body;
    console.log(username)
    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
        return res.json({
            message: "Logged in successfully", token
        });
    }
    res.status(403).send({
        message: "Invalid username or password"
    });
});

router.get("/me", authenticateJwt, async (req, res) => {
console.log("me route called")
    const userId = req.headers["userId"]
    const user = await User.findOne({ _id: userId });
    if (user) {
        console.log("user found",user)
        res.json({
            username: user.username
        });
    } else {
        console.log("user not found")
        res.status(403).send("User not found");
    }
});

