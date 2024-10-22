"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.Todo = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String
});
const todoSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Todo = mongoose_1.default.model('Todo', todoSchema);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGO_URI = process.env.MONG;
    try {
        if (!MONGO_URI) {
            throw new Error("MONGODB URI is not available");
        }
        yield mongoose_1.default.connect(MONGO_URI, { dbName: 'courses' });
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
