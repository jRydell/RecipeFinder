# RecipeFinder

RecipeFinder is developed by Johan Rydell as a final project for the Frontend Developer program at Yrkeshögskolan Borås. This full-stack application demonstrates knowledge in modern web development technologies, CI/CD practices, and deployment strategies.

> **Note:** This project is currently under active development.

RecipeFinder helps users find, save and rate recipes. The app lets you search and browse recipes from The MealDB API, save favorites to a MySQL database, and share your opinions through ratings and comments. Built with React and Node.js.

## Project Features

- User authentication with JWT
- Recipe search and discovery powered by The MealDB API
- Personal recipe collection management
- Recipe rating system
- Comments functionality
- Responsive design for mobile and desktop
- Dark/light theme support

## Frontend Technologies

- React 19 with TypeScript 5.7
- React Router 7 for navigation
- Shadcn UI for themeable, accessible component library
- Tailwind CSS 4 for styling
- Zustand 5 for state management
- Zod for input validation
- Axios for API requests
- Vite 6 as build tool

## Backend Technologies

- Node.js with Express 4.21
- TypeScript 5.6 for type safety
- MySQL database with mysql2 driver
- JWT authentication
- BCrypt for password hashing
- RESTful API architecture
- Environment configuration with dotenv
- CORS handling for secure cross-origin requests

## CI/CD & Deployment

- GitHub Actions for CI/CD pipelines
- Automated build checks on pull requests
- Automated deployment to production on merge to **main** branch
- Self-hosted Ubuntu server
- Nginx web server as a reverse proxy
- PM2 process manager for Node.js backend

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [MySQL 8.0+](https://dev.mysql.com/downloads/)

### Installation

1.  Clone the repository

    ```bash
    git clone https://github.com/jRydell/projectunknown.git
    cd projectunknown
    ```

2.  Install frontend dependencies

    ```bash
    cd frontend
    npm install
    ```

3.  Install backend dependencies

    ```bash
    cd ../server
    npm install
    ```

4.  Create a `.env` file in the **backend** directory with the following variables:

    ```env
    DB_HOST=localhost
    DB_USER=yourusername
    DB_PASSWORD=yourpassword
    DB_NAME=recipefinder
    JWT_SECRET=your-secret-key
    PORT=3000
    ```

    > **Note:** Keep the `.env` file secure and do not commit it to version control.

5.  Create the database & tables

    Ensure MySQL is running. Open your MySQL client (CLI or GUI). Open the file `server/src/sql/schema.sql` in your editor, select all, copy and paste into your client, then execute.

    **Using MySQL CLI:**

    ```bash
    mysql -u yourusername -p
    source path/to/server/src/sql/schema.sql;
    ```

6.  Start the backend server

    Run the following command in the terminal:

        > **Note:** Make sure you are in the correct folder path/to/server/.

    ```bash
    npm run dev
    ```

7.  Start the frontend development server

    Open a separate terminal and run:

    ```bash
    cd ../frontend
    npm run dev
    ```

8.  Open the application in your browser

    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend API: [http://localhost:3000/api](http://localhost:3000/api)

## Troubleshooting

- **MySQL Connection Issues:** Ensure MySQL is running and the credentials in the `.env` file are correct.
- **Port Conflicts:** If ports 3000 or 5173 are in use, update the `.env` file or Vite configuration.
- **Missing Dependencies:** Run `npm install` in the respective directory to install missing packages.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Johan Rydell – [GitHub Profile](https://github.com/jRydell)  
Project Link: [https://github.com/jRydell/projectunknown](https://github.com/jRydell/projectunknown)
