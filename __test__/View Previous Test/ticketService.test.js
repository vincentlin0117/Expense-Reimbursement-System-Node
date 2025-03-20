const {getAllTicketsByUserId} = require('../../src/Service/ticketService')
const ticketDAO = require('../../src/Repository/ticketDAO');

jest.mock('../../src/Repository/ticketDAO')

describe("getAllTicketsByUserId", ()=>{
    const fakeTicket = {
        id: "abc123",
        resolver: "John Doe",
        userId: "xyz890",
        description: "Issue with login credentials not working.",
        type: "Travel",
        amount: 150.25,
        status: "Resolved",
        createDate: "2025-03-14"
    }; 
    const fakeTicket2 = {
        id: "dfgzdtrfuhy",
        resolver: "John Doe",
        userId: "xyz890",
        description: "Issue with login credentials not working.",
        type: "Travel",
        amount: 150.25,
        status: "Pending",
        createDate: "2025-03-14"
    };
    const fakeTicket3 = {
        id: "asf",
        resolver: "John Doe",
        userId: "xyz890",
        description: "Issue with login credentials not working.",
        type: "Travel",
        amount: 150.25,
        status: "Pending",
        createDate: "2025-03-15"
    };

    test("should return success true and a list of tickets", async ()=>{
        ticketDAO.getAllTicketsByUserId.mockResolvedValue([fakeTicket,fakeTicket2,fakeTicket3])

        const userId = "xyz890"
        const result = await getAllTicketsByUserId(userId)
        expect(result).toEqual({success:true,tickets:result.tickets})
    })

    test("should return success fail and a message saying failed to get tickets", async ()=>{
        ticketDAO.getAllTicketsByUserId.mockResolvedValue(null)

        const userId = "xyz890"
        const result = await getAllTicketsByUserId(userId)
        expect(result).toEqual({success: false, code:500, message:"Failed to get tickets"})
    })

    test("should return success true and a list of tickets with type = travel", async ()=>{
        ticketDAO.getAllTicketsByUserId.mockResolvedValue([fakeTicket])

        const userId = "xyz890"
        const type = "Travel"

        const result = await getAllTicketsByUserId(userId,type)
        expect(result).toEqual({success:true,tickets:result.tickets})
        expect(result.tickets[0].type).toEqual("Travel")
    })
})