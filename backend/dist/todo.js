"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const router = express_1.default.Router();
router.post('/addTodo', auth_1.authenticateJwt, (req, res) => {
    const { title, description } = req.body;
    const userId = req.headers["userId"];
    const done = false;
    const todo = new db_1.Todo({ title, description, done, userId });
    todo.save()
        .then(saved => {
        console.log(saved);
        res.status(200).json(saved);
    })
        .catch(err => {
        res.status(500).json({
            mes: "Failed to create a todo"
        });
    });
});
router.get('/todo', auth_1.authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];
    db_1.Todo.find({ userId })
        .then(todos => {
        res.status(200).json(todos);
    })
        .catch(err => {
        res.status(500).json({
            mes: "Failed to get todos"
        });
    });
});
router.patch('/todos/:todoId/done', auth_1.authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
    db_1.Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
        .then(updated => {
        if (!updated) {
            return res.status(404).json("Todo not found");
        }
        res.status(200).json(updated);
    })
        .catch(err => {
        res.status(500).json({
            mes: "Failed to update todo"
        });
    });
});
exports.default = router;
