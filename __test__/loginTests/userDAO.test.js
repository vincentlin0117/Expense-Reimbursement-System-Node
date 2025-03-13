const {getUserByEmailAndPassword,createUser} = require('../../src/Repository/userDAO')
const documentClient = require('../../src/Database/database').documentClient;

describe('getUserByEmailAndPassword', () => {
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

    test('should return user object when DynamoDB query succeeds', async () => {
        jest.spyOn(documentClient,'send').mockResolvedValue({Items: [mockUser]});

        const result = await getUserByEmailAndPassword('john.doe@example.com', 'p@ssw0rd!')
        expect(result).toEqual(mockUser)
    });

    test('should return undefined since there wasnt user with those credentials', async ()=>{
        jest.spyOn(documentClient,'send').mockResolvedValue({Items: []});

        const result = await getUserByEmailAndPassword('test.doe@example.com', 'p@ssw0rd!')
        expect(result).toBeUndefined()
        
    });
    
    test('should return null since there was a error', async ()=>{
        jest.spyOn(documentClient,'send').mockRejectedValue(new Error('Testing error'))
        const result = await getUserByEmailAndPassword('john.doe@example.com','p@ssw0rd!')
        expect(result).toBeNull()
    })
});

describe('createUser', () => {
    const mockUser = {
        "userId": "fakeid",
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

    test('should return true when new user is created', async () => {
        jest.spyOn(documentClient,'send').mockResolvedValue();

        const result = await createUser(mockUser)
        expect(result).toEqual(true)
    });
    
    test('should return false when documentClient returns error', async () => {
        jest.spyOn(documentClient,'send').mockRejectedValue(new Error('Testing error'));

        const result = await createUser(mockUser)
        expect(result).toEqual(false)
    });
})
