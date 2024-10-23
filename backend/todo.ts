import { authenticateJwt } from "./auth";
import express from "express";
import { Todo } from "./db";

const router = express.Router();

router.post('/addTodo', authenticateJwt, (req, res) => {
    console.log("i am here to add todo")
    const { title, description } = req.body;
    const userId = req.headers["userId"];
    const done = false;
    const todo = new Todo({ title, description, done, userId });

    todo.save()
        .then(saved => {
            console.log("todo saved successfully",saved)
            res.status(200).json(saved);
        })
        .catch(err => {
            res.status(500).json({
                mes: "Failed to create a todo"
            });
        });
});

router.get('/todo', authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];

    Todo.find({ userId })
        .then(todos => {
            res.status(200).json(todos);
        })
        .catch(err => {
            res.status(500).json({
                mes: "Failed to get todos"
            });
        });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
    Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
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

export default router;
