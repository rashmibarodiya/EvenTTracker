
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {
      type: String,
      required: true, // Optional: ensure email is required
      unique: true, // Optional: ensure email is unique
      trim: true, // Optional: remove whitespace from both ends
      validate: {
          validator: function(v : string) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email regex
          },
          message: props => `${props.value} is not a valid email!`
      }
  }
})
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
    date: { type: Date, required: true },
    setReminder: { type: Boolean, default: true } 
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
