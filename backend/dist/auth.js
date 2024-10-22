"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.router = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const express = __importStar(require("express"));
const secret = "arabi";
const db_1 = require("./db");
exports.router = express.Router();
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //console.log("hi authen")
    if (authHeader) {
        //    console.log("auth  "+authHeader)
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                console.log("token is not valid");
                return res.status(403).send("Token is not valid");
            }
            if (user && typeof user !== "string") {
                req.headers["userId"] = user.id;
                //  req.userId = user.id; // the id is given in jwt.sign in login and signup and it is equal to  _id 
                next();
            }
            else {
                res.sendStatus(403);
            }
        });
    }
    else {
        res.status(401).send("Token not provided");
    }
};
exports.authenticateJwt = authenticateJwt;
exports.router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("i am in");
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username });
    console.log("kaboom");
    if (user) {
        return res.status(403).send("User already exists");
    }
    const newUser = new db_1.User({ username, password });
    yield newUser.save();
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });
    res.json({
        message: "User created successfully", token
    });
}));
exports.router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in login");
    const { username, password } = req.body;
    console.log(username);
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
        return res.json({
            message: "Logged in successfully", token
        });
    }
    res.status(403).send({
        message: "Invalid username or password"
    });
}));
exports.router.get("/me", exports.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const user = yield db_1.User.findOne({ _id: userId });
    if (user) {
        res.json({
            username: user.username
        });
    }
    else {
        res.status(403).send("User not found");
    }
}));
