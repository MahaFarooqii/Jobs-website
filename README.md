# Description
This project is a full stack application that includes a job posting feature with automated job description summarization. It uses a React frontend, a Node.js backend, and a Python server for text summarization.

# Installation and Setup
Step 1: Install Dependencies
First, navigate to the summary folder in your project directory and install the necessary dependencies using npm:

npm install

Step 2: Start the Python Server
After installing the dependencies, navigate to the backend folder where the Python server is located and start the server:

cd src/backend

python app.py

Step 3: Start the Node.js Backend Server
In the same backend directory, start the Node.js backend server using nodemon:

nodemon index.js

Step 4: Start the React Frontend
Finally, navigate back to the summary folder and start the React frontend:

npm start

# Project Structure
summary/src/backend: Contains the backend code for the project.

app.py: Python server script for text summarization.

index.js: Node.js server script for handling job postings and interacting with the Python server.

summary/src/frontend: Contains the React frontend code for the project.

# Usage

After completing the setup steps above, the application will be running locally. You can access it through your web browser at http://localhost:3000.
