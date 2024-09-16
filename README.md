**Project Management Platform**

**Overview**

Welcome to the Project Management Platform. This application is designed to help members track their project statuses, communicate via chat, and engage in video calls. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), this platform offers a flawless user experience with real-time communication features.

**Features**

- **Project Status Tracking**: Members can view the status of their projects and update their progress.
- **Real-time Chat**: Engage in real-time conversations with other members using our chat feature.
- **Video Calling**: Use Firebase to make video calls between members.
- **Admin Privileges**: Admins can add, edit, and delete projects, ensuring effective management of project data.
- **Collaborative Document Editing**: Users can create a new document file and other users can also contribute their work through it.

**Technologies Used**

- **MongoDB**: NoSQL database for storing project and user data.
- **Express.js**: Web framework for building RESTful APIs.
- **React.js**: Frontend library for creating dynamic and responsive user interfaces.
- **Node.js**: JavaScript runtime for building server-side applications.
- **Socket**.**IO**: Socket.IO is a JavaScript library that enables real-time, bidirectional communication between web clients and servers.
- **Firebase**: For real-time video calling functionality.

**Getting Started**

**Prerequisites**

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- Firebase project setup

**Installation**

**Frontend:**

1. **Clone the repository:**

bash

Copy code

git clone <https://github.com/your-repo/project-management-platform.git>

cd project-management-platform

1. **Install dependencies:**

bash

Copy code

npm install:

&nbsp;&nbsp;&nbsp;"axios": "^1.7.7",

&nbsp;&nbsp;&nbsp;&nbsp;   "bcryptjs": "^2.4.3",

&nbsp;&nbsp;&nbsp;&nbsp;   "firebase": "^10.13.1",

&nbsp;&nbsp;&nbsp;&nbsp;   "jsonwebtoken": "^9.0.2",

&nbsp;&nbsp;&nbsp;&nbsp;   "quill": "^2.0.2",

&nbsp;&nbsp;&nbsp;&nbsp;   "react": "^18.3.1",

&nbsp;&nbsp;&nbsp;&nbsp;   "react-dom": "^18.3.1",

&nbsp;&nbsp;&nbsp;&nbsp;   "react-router-dom": "^6.26.2",

&nbsp;&nbsp;&nbsp;&nbsp;   "react-scripts": "5.0.1",

&nbsp;&nbsp;&nbsp;&nbsp;   "socket.io-client": "^4.7.5",


1. **Start the application:**

bash

Copy code

npm start

1. **Access the application:**

Open your web browser and go to <http://localhost:3000>.

Backend:

1. **Clone the repository:**

&nbsp;&nbsp;&nbsp;bash

&nbsp;&nbsp;&nbsp;Copy code

&nbsp;&nbsp;&nbsp;git clone <https://github.com/your-repo/project-management-platform.git>

&nbsp;&nbsp;&nbsp;cd project-management-platform

1. Install Dependencies:

npm install :

&nbsp;&nbsp;&nbsp;"bcryptjs": "^2.4.3",

&nbsp;&nbsp;&nbsp;“cors": "^2.8.5",

&nbsp;&nbsp;&nbsp;"express": "^4.21.0",

&nbsp;&nbsp;&nbsp;"jsonwebtoken": "^9.0.2",

&nbsp;&nbsp;&nbsp;"mongoose": "^8.6.2",

&nbsp;&nbsp;&nbsp;"socket.io": "^4.7.5"

1. Start application:

&nbsp;&nbsp;&nbsp;node app.js

&nbsp;&nbsp;&nbsp;you should see the following:

&nbsp;&nbsp;&nbsp;Server is running on <http://localhost:5000>

&nbsp;&nbsp;&nbsp;User connected: ByOsKi-ki_dO4h5eAAAH

&nbsp;&nbsp;&nbsp;User connected: wZowZCSENX8_N8h2AAAI

&nbsp;&nbsp;&nbsp;MongoDB connected

(No .env files you can directly run without worrying about mongodb—make sure you turned off firewall)

**Admin Features**

Admins have special privileges to manage projects:

- **Add Projects**: Admins can add new projects to the platform.
- **Edit Projects**: Admins can edit existing project details.
- **Delete Projects**: Admins can remove projects from the platform.

**Usage**

- **Dashboard**: Members can view their project statuses and update progress.
- **Chat**: Navigate to the chat section to start or join conversations with other members.
- **Video Calls**: Use the video call feature to connect with other members in real time.
- **Collaborative Writing**: Users can write their contributions in a single document

**Contributing**

We welcome contributions to improve the Project Management Platform! If you have suggestions or find issues, please submit a pull request or create an issue on GitHub.

**Project Members:**

- Pranav Ram P S (BS23B012) – pranavram2005 (Github)

Did the User side backend part (except conference) and admin side backend part

- Mogith Guru A M (CH23B096) – Bash-n-Git (Github)

Did User side frontend, video conference backend, admin page, login and registration page.
