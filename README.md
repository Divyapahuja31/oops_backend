# Complaint Management System Backend

A robust, Object-Oriented Backend for managing complaints, built with Node.js, Express, and TypeScript. This project demonstrates clean architecture using the **Controller-Service-Repository** pattern.

## 🚀 Features

-   **Authentication**: User registration and login with JWT and bcrypt.
-   **Complaint Management (CRUD)**: Create, Read (All/One), Update, Delete complaints.
-   **Advanced Querying**:
    -   **Search**: Filter by title or description.
    -   **Filtering**: Filter by status (PENDING, RESOLVED).
    -   **Sorting**: Sort by various fields (e.g., id) in ascending/descending order.
    -   **Pagination**: Efficiently handle large lists with page and limit parameters.
-   **Architecture**:
    -   **OOP Principles**: Strong use of Classes and Interfaces.
    -   **Repository Pattern**: Separation of data access from business logic.
    -   **Service Layer**: Encapsulation of business rules.
-   **Error Handling**: Centralized error handling using custom AppError and middleware.

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Language**: TypeScript
-   **Framework**: Express.js
-   **Security**: jsonwebtoken (JWT), bcryptjs
-   **Data Storage**: In-memory data store (simulating a database).

## 📂 Project Structure

```bash
src/
├── controllers/   # Handles incoming HTTP requests and responses
├── services/      # Business logic layer
├── repositories/  # Data access layer (CRUD operations)
├── models/        # Data models and definitions
├── routes/        # API route definitions
├── middlewares/   # Auth and Error handling middlewares
├── utils/         # Helper functions, constants, and interfaces
├── app.ts         # Express app setup
└── server.ts      # Server entry point
```

## 🔧 Installation & Running

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd oops_backend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

## 📡 API Endpoints

### Auth
-   `POST /api/auth/register` - Register a new user.
-   `POST /api/auth/login` - Login and receive a JWT token.

### Complaints (Requires Auth Token)
All complaint routes require the `Authorization: Bearer <token>` header.

-   `POST /api/complaints` - Create a new complaint.
-   `GET /api/complaints` - Get all complaints (supports `?page=1&limit=10&search=...&status=...`).
-   `GET /api/complaints/:id` - Get a specific complaint.
-   `PATCH /api/complaints/:id` - Update a complaint.
-   `PATCH /api/complaints/:id/resolve` - Mark a complaint as resolved.
-   `DELETE /api/complaints/:id` - Delete a complaint.
