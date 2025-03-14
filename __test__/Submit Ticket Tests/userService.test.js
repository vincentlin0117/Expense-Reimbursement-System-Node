const {findUserById} = require('../../src/Service/userService')
const userDAO = require('../../src/Repository/userDAO')

jest.mock('../../src/Repository/userDAO')

describe('findUserById', ()=>{
    const mockUser = {
        "userId": "fakeid",
        "firstname": "John",
        "middlename": "A.",
        "lastname": "Doe",
        "username": "admin",
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

    test("should return object with success true and userobject with same id", async ()=>{
        userDAO.getUserById.mockResolvedValue(mockUser)

        const result = await findUserById('fakeid')
        expect(result).toEqual({success:true,user:mockUser})
    })

    test("should return object with success false and message that said it failed, didnt find person with id", async ()=>{
        userDAO.getUserById.mockResolvedValue(undefined)

        const result = await findUserById('fakeid')
        expect(result).toEqual({success:false,message:"Failed to find user with that userid"})
    })

    test("should return object with success false and message that said it failed, error from documentClient", async ()=>{
        userDAO.getUserById.mockResolvedValue(undefined)

        const result = await findUserById('fakeid')
        expect(result).toEqual({success:false,message:"Failed to find user with that userid"})
    })

})