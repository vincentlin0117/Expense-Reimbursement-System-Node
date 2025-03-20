const userDAO = require("../../src/Repository/userDAO")
const {updateRole} = require("../../src/Service/userService")

jest.mock("../../src/Repository/userDAO")

describe("updateRole", ()=>{
    test("shoud return success true and message saying role update", async ()=>{
        userDAO.getUserById.mockResolvedValue(true)
        userDAO.updateUser.mockResolvedValue(true)

        const managerId = "managerId"
        const userId = "fakeId";
        const role = "Manager";

        const result = await updateRole(managerId,{userId,role})

        expect(result).toEqual({success:true,message:"Role updated"})
    })
    test("shoud return success false and message saying failed to update", async ()=>{
        userDAO.getUserById.mockResolvedValue(true)
        userDAO.updateUser.mockResolvedValue(false)

        const managerId = "managerId"
        const userId = "fakeId";
        const role = "Manager";
        const result = await updateRole(managerId,{userId,role})

        expect(result).toEqual({success:false,code:500, message:"Failed to update"})
    })
    test("shoud return success false and message saying user doesnt exist", async ()=>{
        userDAO.getUserById.mockResolvedValue(false)

        const managerId = "managerId"
        const userId = "dne";
        const role = "Manager";
        
        const result = await updateRole(managerId,{userId,role})

        expect(result).toEqual({success:false,code:400, message:"User does not exist"})
    })
    test("shoud return success false and message saying cannot update self", async ()=>{
        const managerId = "managerId"
        const userId = "managerId";
        const role = "Manager";

        const result = await updateRole(managerId,{userId,role})

        expect(result).toEqual({success:false, code:403, message:"Cannot change your own role"})
    })
})