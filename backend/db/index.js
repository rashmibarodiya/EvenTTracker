const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    password : String
})
const todoSchema = new mongoose.Schema({
    title: String,
    description : String,
    done : Boolean,
    userId : String
})

export const User= mongoose.model('User', userSchema) // exp changed 
export const Todo = mongoose.model('Todo', todoSchema)
