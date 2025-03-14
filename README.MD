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
│   │   ├── userDAO.js
│   │   └── ticketDAO.js
│   ├── utils/    
│   │   ├── bcrypt.js
│   │   ├── jwt.js
│   │   └── logger.js
│   ├── database/           // Database connection setup
│   │   └── database.js
├── __test__
│   │   └──...test.js
├── .env
├── package.json            // Project dependencies and scripts
├── .package-lock.json                    // Environment variables
├── .gitignore              // Git ignore file
```
## User
- id
- name
- username
- password
- email
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
- getUserByUsername
- createUser 
- getUserById

## userService methods
- findUserByUsernameAndPassword
- createUser

## User Features
- login in at /login
- register/create account at /register

## ticketDAO methods
- createTicket
- getTicketByStatus
- updateTicketStatus

## ticketService methods
- createTicket
- view tickets
- update ticket status

## Ticket features
- submit ticket /ticket
- aprrove/deny ticket /ticket
- view all pending tickets /ticket/pending