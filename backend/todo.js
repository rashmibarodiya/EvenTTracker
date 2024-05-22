const { authenticateJwt } = require("./auth");
const express = require("express");
const { Todo } = require("./db");

const router = express.Router();

router.post('/addTodo', authenticateJwt, (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId;
    const done = false;
    const todo = new Todo({ title, description, done, userId });

    todo.save()
        .then(saved => {
            res.status(200).json(saved);
        })
        .catch(err => {
            res.status(500).json({
                mes: "Failed to create a todo"
            });
        });
});

router.get('/todo', authenticateJwt, (req, res) => {
    const userId = req.userId;

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
    const userId = req.userId;

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

module.exports = router;