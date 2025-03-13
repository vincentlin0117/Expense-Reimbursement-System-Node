const {findUserByEmailAndPassword,createUser} = require('../../src/Service/userService')
const userDAO = require('../../src/Repository/userDAO')
const bcryptUtils = require('../../src/Utils/bcrypt')

jest.mock('../../src/Repository/userDAO')
jest.mock('../../src/Utils/bcrypt')
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

    test('should return object with sucesses:true and user object', async () =>{
        userDAO.getUserByEmail.mockResolvedValue(mockUser)
        bcryptUtils.hashPassword.mockResolvedValue("temp")
        bcryptUtils.comparePassword.mockResolvedValue(true)

        const result = await findUserByEmailAndPassword({email:'john.doe@example.com', password:'p@ssw0rd!'})
        expect(result).toEqual({success:true,user:mockUser})
    })

    test('should return success false and message for incorrect cred since there was an error when scanning database', async () =>{
        userDAO.getUserByEmail.mockResolvedValue(null)

        const result = await findUserByEmailAndPassword({email:'john.doe@example.com', password:'p@ssw0rd!'})
        expect(result).toEqual({success:false,message:'Incorrect email or password'})
    })

    test('should return success false and message for incorrect cred since no one matches the email', async ()=>{
        userDAO.getUserByEmail.mockResolvedValue(undefined)

        const result = await findUserByEmailAndPassword({email:'test@example.com',password:'password123'})
        expect(result).toEqual({success:false,message:'Incorrect email or password'})
    })

    test('should return success false and message for incorrect cred since no password doesnt match', async ()=>{
        userDAO.getUserByEmail.mockResolvedValue(undefined)
        jest.spyOn(bcryptUtils,'comparePassword').mockResolvedValue(false)

        const result = await findUserByEmailAndPassword({email:'test@example.com',password:'password123'})
        expect(result).toEqual({success:false,message:'Incorrect email or password'})
    })
})

describe('createUser', ()=>{
    const mockUser = {
        "firstname": "John",
        "middlename": "A.",
        "lastname": "Doe",
        "email": "john.doe@example.com",
        "password": "$2b$10$jnM3t7dp3qBrN//ciNYAU.zHETJW5J1oYuQnD5eGZKhmElV2T8Iki",
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

    test('should return object with success true and the user object with a userId',async ()=>{
        userDAO.createUser.mockResolvedValue(true)
        
        let result = await createUser(mockUser)

        expect(result).toMatchObject(
            {success:true,
                user:{
                    "userId": expect.any(String),
                    "firstname": "John",
                    "middlename": "A.",
                    "lastname": "Doe",
                    "email": "john.doe@example.com",
                    "password": expect.any(String),
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
            }
        )
    })
    
    test('should return object with success false and message with failed to create user', async ()=>{
        userDAO.createUser.mockResolvedValue(false)

        let result = await createUser(mockUser)

        expect(result).toEqual({success:false,message:"Failed to create user"})
    })
    test('should return object with success false and message with email in use', async ()=>{
        userDAO.getUserByEmail.mockResolvedValue(mockUser)
        
        const result = await createUser(mockUser)

        expect(result).toEqual({success:false,message:"Email is already in use"})
    })
})