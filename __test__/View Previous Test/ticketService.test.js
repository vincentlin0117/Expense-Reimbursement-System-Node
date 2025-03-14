const {getAllTicketsByUserId} = require('../../src/Service/ticketService')
const ticketDAO = require('../../src/Repository/ticketDAO');

jest.mock('../../src/Repository/ticketDAO')

describe("getAllTicketsByUserId", ()=>{
    const fakeTicket = {
        id: "abc123",
        resolver: "John Doe",
        userId: "xyz890",
        description: "Issue with login credentials not working.",
        type: "Technical",
        amount: 150.25,
        status: "Resolved",
        createDate: "2025-03-14"
    };

    test("should return success true and a list of tickets", async ()=>{
        ticketDAO.getAllTicketsByUserId.mockResolvedValue([fakeTicket])

        const userId = "xyz890"
        const result = await getAllTicketsByUserId(userId)
        expect(result).toEqual({success:true,tickets:result.tickets})
    })

    test("should return success true and a list of tickets", async ()=>{
        ticketDAO.getAllTicketsByUserId.mockResolvedValue(null)

        const userId = "xyz890"
        const result = await getAllTicketsByUserId(userId)
        expect(result).toEqual({success: false, code:500, message:"Failed to get tickets"})
    })
})