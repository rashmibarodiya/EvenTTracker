
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String
})

export const User = mongoose.model('User', userSchema) 
export const Todo = mongoose.model('Todo', todoSchema)


export const connectDB = async () => {
    const MONGO_URI = process.env.MONG
    try {
        if(!MONGO_URI){
            throw new Error("MONGODB URI is not available")
        }
      await mongoose.connect(MONGO_URI,
        { dbName: 'todos' }
      );
      
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      process.exit(1);
      
    }
  };
