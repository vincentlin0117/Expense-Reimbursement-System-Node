# Structure
```
project/
├── src/
│   ├── app.js            // Main entry point, initializes the app
│   ├── routes/             // Define API endpoints (only route definitions)
│   │   ├── ticketRoutes.js // Routes for tickets (e.g., create/view tickets)
│   │   ├── userRoutes.js   // Routes for user-related operations
│   ├── controllers/        // Contains request handlers
│   │   ├── ticketController.js
│   │   └── userController.js
│   ├── services/           // Contains core business logic
│   │   ├── ticketService.js
│   │   └── userService.js
│   ├── Repository/             // interacting with db
│   │   ├── userModel.js
│   │   └── ticketModel.js
│   ├── utils/              
│   │   └── logger.js
│   ├── database/           // Database connection setup
│   │   └── connect.js
├── __test__
│   │   └──...test.js
├── package.json            // Project dependencies and scripts
├── .package-lock.json                    // Environment variables
├── .gitignore              // Git ignore file
```
## User
- id
- name
- username
- password
- role
- address
- picture?
## Ticket
- id
- resolver
- author
- description
- type
- amount
- status

## userDOA methods
- getUserByNameAndPassword: return userObj
- createUser - return t/f

## userService methods
- findUserByNameAndPassword - return userObj/null
- createUser - return userObj/null

## User Features
- login in at /login
- register/create account at /register

## ticketDAO methods
- createTicket

## ticketService methods
- createTicket

## Ticket features
- submit ticket