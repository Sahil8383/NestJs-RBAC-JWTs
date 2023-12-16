# NestJS RBAC Implementation with JWT Strategy and Guards

This repository contains a NestJS project that implements Role-Based Access Control (RBAC) using JWT Strategy and Guards. The project includes three main resources: Auth, Database, and Users.

## Installation and Setup

Follow these steps to set up and run the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Sahil8383/NestJs-RBAC-JWTs.git
   cd NestJs-RBAC-JWTs
2. **Install the Dependencies:**
   ```bash
   npm install
3. **Run the project with the below command:**
   ```bash
   npm run start:dev

## Auth Resource

### AuthController

The `AuthController` handles authentication-related routes such as login, registration, and token refreshing.

#### Endpoints:

1. **Login:**
   - Endpoint: `POST /auth/login`
   - Description: Authenticates a user and returns JWT tokens.
   - Request Body: User credentials (username and password).
   - Response: JWT tokens (access and refresh).

2. **Register:**
   - Endpoint: `POST /auth/register`
   - Description: Registers a new user.
   - Request Body: User details (username, password, etc.).
   - Response: Newly created user details.

3. **Refresh Token:**
   - Endpoint: `POST /auth/refresh`
   - Description: Refreshes the access token using the refresh token.
   - Request Headers: Authorization header with the refresh token.
   - Response: New access and refresh tokens.

## Users Resource

### UserController

The `UserController` manages user-related routes, including fetching all users, retrieving a user by ID, creating a new user, and accessing a protected route.

#### Endpoints:

1. **Get All Users:**
   - Endpoint: `GET /user`
   - Description: Retrieves a list of all users.
   - Response: List of user details.

2. **Get User by ID:**
   - Endpoint: `GET /user/:id`
   - Description: Retrieves user details by ID (requires ADMIN role).
   - Request Parameters: User ID.
   - Response: User details.

3. **Create User:**
   - Endpoint: `POST /user/create`
   - Description: Creates a new user.
   - Request Body: User details (username, password, etc.).
   - Response: Newly created user details.

4. **Protected Route:**
   - Endpoint: `POST /user/protected`
   - Description: A protected route accessible only to users with the USER role.
   - Request Headers: Authorization header with a valid access token.
   - Response: Message indicating successful access.

## Authentication and Authorization Approach

### JWT Strategy

- The project utilizes a JWT Strategy for user authentication.
- The `JwtStrategy` class is responsible for decoding JWT tokens and extracting user information.

### Guards

- Guards, specifically `JwtGuard` and `RoleGuard`, are employed for authorization and role-based access control.
- `JwtGuard` checks the validity of the JWT token and decodes it using the `JwtStrategy`.
- `RoleGuard` ensures that users have the required roles to access specific routes. It relies on the `@Role` decorator applied to controller methods.

### Role-Based Access Control (RBAC)

- RBAC is implemented through roles assigned to users.
- Roles, represented as an enum or string, determine access to specific routes.
- Routes are guarded based on the user's role, allowing fine-grained control over resource access.

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Configure environment variables, including the JWT secret and MongoDB connection details.
4. Start the application: `npm run start`

## Conclusion

This NestJS project demonstrates a robust authentication and authorization system using JWT Strategy and Guards. It allows for secure user authentication, role assignment, and controlled access to various routes based on the user's role. Customize the implementation further to meet the specific needs of your project.
