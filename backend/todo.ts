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
            console.log("todos are here ",todos)
            res.status(200).json(todos);
        })
        .catch(err => {
            console.log("failed to get todos ",err)
            res.status(500).json({
                mes: "Failed to get todos"
            });
        });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {

    console.log("here for updating the todo")
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


router.delete('/todos/:todoId', authenticateJwt, (req, res) => {
    console.log("Attempting to delete the todo");

    const { todoId } = req.params;

    // Assuming you are using Mongoose
    Todo.deleteOne({ _id: todoId })
        .then(result => {
            if (result.deletedCount === 0) {
                console.log("no todo found")
                return res.status(404).json({ message: "Todo not found" });
            }
            res.status(200).json({ message: "Todo successfully deleted" });
        })
        .catch(err => {
            console.error("Error deleting todo:", err);
            res.status(500).json({
                message: "Failed to delete todo"
            });
        });
});


export default router;
