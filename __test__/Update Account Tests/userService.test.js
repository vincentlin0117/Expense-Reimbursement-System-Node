const userDAO = require('../../src/Repository/userDAO')
const {updateAccount} = require('../../src/Service/userService')
const bcryptUtils = require('../../src/Utils/bcrypt')
jest.mock('../../src/Repository/userDAO')
jest.mock('../../src/Utils/bcrypt')
describe("updateAccount", ()=>{
    test("should return success true and message saying account updated", async ()=>{
        const updateFields = {
            username: "newUsername",
            password: "newPassword",
            firstname: "joe"
        }
        const userId = "fakeId"
        
        userDAO.getUserByUsername.mockResolvedValue(false)
        userDAO.updateUser.mockResolvedValue(true)
        bcryptUtils.hashPassword.mockResolvedValue("newHashPass")

        const result = await updateAccount(userId,updateFields)
        expect(result).toEqual({success:true, message:"Account Updated"})
    })

    test("should return success false and message saying username is taken", async ()=>{
        const updateFields = {
            username: "takenUsername",
        }
        const userId = "fakeId"
        
        userDAO.getUserByUsername.mockResolvedValue(true)

        const result = await updateAccount(userId,updateFields)
        expect(result).toEqual({success:false, code:400, message:"Username is taken"})
    })

    test("should return success false and message saying failed to update", async ()=>{
        const updateFields = {
            firstname: "joe"
        }
        const userId = "fakeId"
        
        userDAO.updateUser.mockResolvedValue(false)
        bcryptUtils.hashPassword.mockResolvedValue("newHashPass")

        const result = await updateAccount(userId,updateFields)
        expect(result).toEqual({success:false, code:500, message:"Update Failed"})
    })
})