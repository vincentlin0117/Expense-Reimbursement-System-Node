const {createTicket} = require('../../src/Service/ticketService')
const ticketDAO = require('../../src/Repository/ticketDAO')
const userService = require('../../src/Service/userService')

jest.mock('../../src/Repository/ticketDAO')

describe('createTicket', ()=>{
    const userId = "51e5e60a-1602-44be-893c-63aaefb918dd"
    const ticket ={
        description: "A detailed description of the issue or request",
        type: "Travel",
        amount: 150.0
    }

    test('should return success true and the ticket with all fields filled', async ()=>{
        jest.spyOn(userService,'findUserById').mockResolvedValue({success:true})
        ticketDAO.createTicket.mockResolvedValue(true)
        
        const result = await createTicket(userId,ticket)
        expect(result).toMatchObject({
            success:true,
            ticket: {
                ticketId: expect.any(String),
                userId: "51e5e60a-1602-44be-893c-63aaefb918dd",
                description: "A detailed description of the issue or request",
                type: "Travel",
                amount: 150.0,
                status:"Pending"
            }
        })
    })
    test('should return success false and a error failed to create ticket', async ()=>{
        jest.spyOn(userService,'findUserById').mockResolvedValue({success:true})
        ticketDAO.createTicket.mockResolvedValue(false)
        
        const result = await createTicket(userId,ticket)
        expect(result).toEqual({success:false,code:500, message:'Failed to create ticket'})
    })

    test('should return success false and a error user doesnt exist', async ()=>{
        jest.spyOn(userService,'findUserById').mockResolvedValue({success:false})
        
        const result = await createTicket("fakeid",ticket)
        expect(result).toEqual({success:false,code:400, message:'User doesnt exist'})
    })
})