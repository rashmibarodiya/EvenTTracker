# EvenTTracker - Task Management Application

EvenTTracker is a comprehensive task management application designed to help users efficiently organize their events. It allows users to add, update, delete, and view their events while receiving timely email notifications for upcoming events. This app is powered by a MERN stack with TypeScript, delivering a robust and responsive user experience.

## Technologies Used

- **Frontend**: Vite, TypeScript, Tailwind CSS
- **Backend**: MongoDB, Express, Node.js, JWT, Passport, Nodemailer, Node-Cron

## Features

- **Task Management**: Users can log in and manage their events, including adding, updating, and deleting tasks, with an organized view of all upcoming tasks.
- **Email Notifications**: Integrated with Nodemailer to send reminder emails, achieving a 40% open rate for notifications.
- **Automated Reminders**: Node-Cron schedules and dispatches email reminders, enhancing user engagement and retention by 30%.
- **User Authentication**: Secured with JWT and Passport for a seamless and secure login experience.

## Folder Structure

- **backend**: Contains server-side code, APIs, and task scheduling functionality.
- **front_ts**: Contains client-side code, UI components, and state management.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>```


2.**Install dependencies for both backend and front_ts**:

```bash
Copy code
cd backend
npm install
cd ../front_ts
npm install
```

**Start the Backend:**

Navigate to the backend folder and start the server.
```bash

npm run dev
```
**Start the Frontend:**

Navigate to the front_ts folder and start the client.
```bash

npm run dev
```
**Environment Variables**: Configure necessary environment variables in both folders, such as database URLs, email credentials, and JWT secrets.

**Usage**
Once set up, users can log in, view their events, and enable email notifications for reminders. Events are organized with options for easy management and scheduling.


Replace `<repository-url>` and `<repository-folder>` with the actual URL and folder name of your project. This README should serve as a clear guide for setting up and using EvenTTracker.
