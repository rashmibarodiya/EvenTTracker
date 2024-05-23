const jwt = require("jsonwebtoken");
const express = require("express");
const secret = "arabi";
const { User } = require('./db');
const router = express.Router();

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(403).send("Token is not valid");
            }
            req.userId = user.id;
            next();
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
        return res.status(403).send("User already exists");
    }
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });
    res.json({
        message: "User created successfully", token
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
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
    const user = await User.findOne({ _id: req.userId });
    if (user) {
        res.json({
            username: user.username
        });
    } else {
        res.status(403).send("User not found");
    }
});

module.exports = {
    authenticateJwt,
    router
};
