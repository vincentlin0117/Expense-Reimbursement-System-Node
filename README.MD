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
- createDate
- description
- type
- amount
- status

## userDOA methods
- getUserByUsername
- createUser 
- getUserById
- updateUser

## userService methods
- findUserByUsernameAndPassword
- createUser
- findUserById
- updateRole
- updateAccount

## User Features
- login in
- register/create account 
- change roles /updateRoles
- edit account information

## ticketDAO methods
- createTicket
- getAllTicketByStatus
- getAllTicketsByUserId
- getTicketByTicketId
- updateTicket

## ticketService methods
- createTicket
- getTicketsByStatus
- updateTicketStatus
- getAllTicketsByUserId

## Ticket features
- submit ticket
- aprrove/deny ticket 
- view all pending tickets
- view previous tickets
- sort by reimbursement type 


## Endpoints
- /users/user/login
- /users/
- /users/user/{userId}/role
- /users/user/account
- /tickets/ticket
- /tickets/ticket/{ticketId}/status
- /tickets?status=___
- /tickets/user?type=___
