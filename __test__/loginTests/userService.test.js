const {findUserByEmailAndPassword,createUser} = require('../../src/Service/userService')
const userDAO = require('../../src/Repository/userDAO')

jest.mock('../../src/Repository/userDAO')

describe('findUserByEmailAndPassword',()=>{
    const mockUser = {
        "firstname": "John",
        "middlename": "A.",
        "lastname": "Doe",
        "email": "john.doe@example.com",
        "password": "p@ssw0rd!",
        "address": {
            "street": "123 Elm Street",
            "city": "Springfield",
            "state": "IL",
            "postalCode": "62704",
            "country": "USA"
        },
        "picture": "https://example.com/images/john_doe.png",
        "role": "Manager"
    }

    test('should return user object when user object', async () =>{
        userDAO.getUserByEmailAndPassword.mockResolvedValue(mockUser)

        const result = await findUserByEmailAndPassword('john.doe@example.com', 'p@ssw0rd!')
        expect(result).toEqual(mockUser)
    })
    test('should return null there was an error when scanning database', async () =>{
        userDAO.getUserByEmailAndPassword.mockResolvedValue(null)

        const result = await findUserByEmailAndPassword('john.doe@example.com', 'p@ssw0rd!')
        expect(result).toBeNull()
    })
    test('should return null since no one matches the credentials', async ()=>{
        userDAO.getUserByEmailAndPassword.mockResolvedValue(undefined)

        const result = await findUserByEmailAndPassword('test@example.com','password123')
        expect(result).toBeNull()
    })
})

describe('createUser', ()=>{
    const mockUser = {
        "firstname": "John",
        "middlename": "A.",
        "lastname": "Doe",
        "email": "john.doe@example.com",
        "password": "p@ssw0rd!",
        "address": {
            "street": "123 Elm Street",
            "city": "Springfield",
            "state": "IL",
            "postalCode": "62704",
            "country": "USA"
        },
        "picture": "https://example.com/images/john_doe.png",
        "role": "Manager"
    }

    test('should return the user object with a uuid',async ()=>{
        userDAO.createUser.mockResolvedValue(true)
        
        let result = await createUser(mockUser)
        expect(result).toMatchObject({
            "userId": expect.any(String),
            "firstname": "John",
            "middlename": "A.",
            "lastname": "Doe",
            "email": "john.doe@example.com",
            "password": "p@ssw0rd!",
            "address": {
                "street": "123 Elm Street",
                "city": "Springfield",
                "state": "IL",
                "postalCode": "62704",
                "country": "USA"
            },
            "picture": "https://example.com/images/john_doe.png",
            "role": "Manager"
        })
    })
    
    test('should return null since it failed to create user', async ()=>{
        userDAO.createUser.mockResolvedValue(false)

        let result = await createUser(mockUser)

        expect(result).toBeNull()
    })
})