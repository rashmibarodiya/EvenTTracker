import * as jwt from "jsonwebtoken";
import * as express from "express";
const secret = "arabi";
import { User } from './db';
 
import { Request, Response, NextFunction } from "express";
import { error } from "console";


const router = express.Router();
export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    console.log("hi authen")
    const authHeader = req.headers.authorization;
    console.log("hi authen",authHeader)
    if (authHeader) {
            console.log("auth  "+authHeader)
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                console.log("token is not valid",err)
                return res.status(403).send("Token is not valid");
            }
            if (user && typeof user !== "string") {
                req.headers["userId"] = user.id
                console.log("all checks passed")
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

router.get("/auth/status", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.json({ user: null });
    }
});

router.post('/signup', async (req, res) => {
    console.log("i am in")
    const { username, password,email } = req.body;
    const user = await User.findOne({ username });
    console.log("kaboom")
    if (user) {
        console.log("user already exits",user)
        
        return res.status(403).send("User already exists");
    }
    const newUser = new User({ username, password,email });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, secret);
    console.log("user signed up successfully")
    res.json({
        message: "User created successfully", token
    });
});

router.post('/login', async (req, res) => {
    console.log("in login");
    const { username, password } = req.body;
    console.log(username);

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            const token = jwt.sign({ id: user._id }, secret);
            return res.json({
                message: "Logged in successfully", token
            });
        }
        res.status(403).json({
            message: "Invalid username or password"
        });
    } catch (error:any) {
        
        res.status(500).json({
            message: "An error occurred during login",
            error: error.message
        });
    }
});

router.get("/me", authenticateJwt, async (req, res) => {
console.log("me route called")
    const userId = req.headers["userId"]
    const user = await User.findOne({ _id: userId });
    if (user) {
        console.log("user found",user)
        res.json({
            username: user.username || user.name 
        });
    } else {
        console.log("user not found")
        res.status(403).send("User not found");
    }
});

export default router;
