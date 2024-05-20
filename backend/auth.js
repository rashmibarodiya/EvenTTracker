import jwt from "jsonwebtoken";
import express from "express";
const secret = "arabi"
const { User } = require('./db')
const router = express.Router();

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('')[1];
        jwt.varify(token, secret, (err, user) => {
            if (err) {
                return res.status(403).send("not found")
            }
            req.userId = user.id;
            next();
        });
    } else {
        res.status("401").send("token error")
    }
};

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    if (user) {
        res.status(403).send("user already exists")
    }
    const newUser = new User({ username, password })
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' })
    res.json({
        message: "user created successfully", token
    })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password })
    if (user) {
        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' })
        res.json({
            message: "logged in  successfully", token
        })

    }
    res.status(403).send({
        message: "Invalid username or password"
    })
})

router.get("/me", authenticateJwt, async (req, res) => {
    const user = await User.findOne({_id : req.user.id})
    if(user){
        res.json({
            username : user.username
        })
    }else{
        res.status(403).send("user not logged in")
    }
})

export default router;
