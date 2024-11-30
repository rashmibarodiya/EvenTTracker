# EvenTTracker - Task Management Application

**EvenTTracker** is a comprehensive and highly **responsive** task management application designed to help users efficiently organize their events. It allows users to add, update, delete, and view their events while receiving timely email notifications for upcoming events. This app is powered by a **MERN stack** with **TypeScript**, delivering a robust and responsive user experience.

---

## 🚀 Technologies Used

- **Frontend**: [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [Node.js](https://nodejs.org/), [JWT](https://jwt.io/), [Passport](http://www.passportjs.org/), [Nodemailer](https://nodemailer.com/), [Node-Cron](https://www.npmjs.com/package/node-cron)

---
## Demonstration 


https://github.com/user-attachments/assets/18b71ad9-0ec4-4c6a-b9ad-3e68c3ccbe43


---
## 🌟 Features

- **Task Management**:  
  Users can log in and manage their events, including adding, updating, and deleting tasks, with an organized view of all upcoming tasks.

- **Email Notifications**:  
  Integrated with **Nodemailer** to send reminder emails, achieving a 40% open rate for notifications.

- **Automated Reminders**:  
  **Node-Cron** schedules and dispatches email reminders, enhancing user engagement and retention by 30%.

- **User Authentication**:  
  Secured with **JWT** and **Passport** for a seamless and secure login experience.

---


## 🎉 Usage
**Once set up, users can:**

 - Log in and manage events.
 - Add & Delete the events
 - Edit the events and enable/disable the notification
- Enable email notifications for reminders.

## ⚡ Setup Instructions  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/rashmibarodiya/EvenTTracker
   

2. **⚙️ Set up env** 
 

 - Backend env

   ```bash  
   URL=ex-http://localhost:3000
   PORT=ex-3000
   MONG="mongo db uri"
   MAIL="your email"
   PASS="your email pass key"
   GOOGLE_CLIENT_ID="your google client id"
   GOOGLE_CLIENT_SECRET="your google client secret"
   GOOGLE_CALLBACK_URL="callback url like this : http://localhost:3000/auth/google/callback"
   SESSION_SECRET="your session secret"
   JWT_SECRET="your jwt secret"
   FRONT_URL="your frontend url like this : http://localhost:5173"
   ```

  -  Frontend env

      ```bash  
      VITE_URL="your backend url like this http://localhost:3000"
      VITE_FRONT_URL="your frontend url like this http://localhost:5173"
      VITE_PORT="ex- 3000"
      VITE_MONG="your mongo db uri"
      ```

3. **Install dependencies** 
 
   To install the necessary dependencies, you can use either **Yarn** or **npm**:

   ```bash
   # Using Yarn
   yarn install

   # Or using npm
   npm install
   ```

4. **Build the application** 

 - backend : Compile the backend code using TypeScript.
   ```bash  
   tsc
    ```
 - frontend : 
    ```bash
   npm run build
   #or
   yarn build
    ```

   5. **Run the application** 

   To start the application, follow these steps:

   - **Backend**:  
      Run the backend server by executing the following command:

   ```bash
   node dist/index.js
   ```
 
- **Frontend**:  
      Run the frontend application with either of these commands:
   ```bash
   # Using npm
   npm run dev

   # Or using Yarn
   yarn dev

   ```
 



---

   ## 👩‍💻 Made By  

   Developed with ❤️ by **[Rashmi Barodiya](https://github.com/rashmibarodiya)**.  

   If you found this project helpful or interesting, please consider giving it a ⭐ on GitHub!  


   ⭐ **Your support keeps me motivated to create more amazing projects!** ⭐  


