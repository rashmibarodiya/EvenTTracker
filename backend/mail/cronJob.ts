

import cron from "node-cron"
import { sendReminderEmail } from "./confing"
import { Todo ,User} from "../db";
console.log("i am here")
interface Todo {
    title: string,
    description: string,
    done: boolean,
    userId: string,
    date: Date,
    setReminder: boolean
}

export const findUpcoming = async (): Promise<Todo[]> => {
    const now = new Date(); // Current date and time
    const in48Hours = new Date(); // Create a new date object for 48 hours later
    in48Hours.setHours(now.getHours() + 48); // Set it to 48 hours ahead

    return await Todo.find({
        date: { $gte: now, $lte: in48Hours }, // Query for tasks due within the next 48 hours
        setReminder: true,
    });
};

 cron.schedule("0 * * * *", async () => {
// const test = async()=>{

    
    console.log("checking for upcoming tasks")
    try {
        const upcomingTodos = await findUpcoming()

        for (const todo of upcomingTodos) {
            const emailText = `Reminder : your task ${todo.title} is due on ${todo.date}`

            const user = await User.findById(todo.userId).populate("email")
            if(user){
                console.log("user is here ",user)
                await sendReminderEmail(user.email,'Todo Reminder',emailText)
                console.log(`Reminder sent for task: ${todo.title}`);
            }else{
                console.log(`User not found for todo: ${todo.title}`);
            }
            
        }
    } catch (e) {
        console.error("Error in cron job:", e);
    }
}
)
// test()
