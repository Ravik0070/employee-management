## MERN STACK APP - Employee Management

### This is a Employee Managment web application along with Role based access control and jwt authentication, protected routes and crud operations on multiple data according to roles. 


# Node.js API and React.js Setup


This repository contains a Node.js API and a React.js application. Follow the instructions below to set up and run both projects on your local system.

## Node.js API Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Ravik0070/NoteVault.git
   ```

2. Navigate to the `api` directory:

   ```bash
   cd /api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `api` directory and add the following:

   ```env
   PORT=5000
   SECRET_KEY= "any secret"
   DB_URL = "Your MongoDB Altas DB String for db connection"
   ```

   Update the `PORT` value if needed.

5. Start the Node.js API:

   ```bash
   npm run dev
   ```

   The API will be available at http://localhost:5000.

## React.js Application Setup

1. Open a new terminal window/tab.

2. Navigate to the `client` directory:

   ```bash
   cd /client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the React.js application:

   ```bash
   npm start
   ```

   The React app will be available at http://localhost:3000.

## Accessing the Application

Visit [http://localhost:3000](http://localhost:3000) in your web browser to access the React.js application. It will communicate with the Node.js API running at [http://localhost:3001](http://localhost:3001).

