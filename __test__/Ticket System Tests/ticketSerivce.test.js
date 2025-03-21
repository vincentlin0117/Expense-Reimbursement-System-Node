const {getTicketsByStatus,updateTicketStatus} = require('../../src/Service/ticketService')
const ticketDAO = require('../../src/Repository/ticketDAO');

jest.mock('../../src/Repository/ticketDAO')

describe("getTicketsByStatus", ()=>{
    const fakeTicket = {
        id: "abc123",
        resolver: "John Doe",
        author: "Jane Smith",
        description: "Issue with login credentials not working.",
        type: "Technical",
        amount: 150.25,
        status: "Resolved",
        createDate: "2025-03-14"
    };
    
    test("should return list of ticket with status of Pending", async ()=>{
        ticketDAO.getAllTicketByStatus.mockResolvedValue([fakeTicket])

        const result = await getTicketsByStatus({status:"Pending"})
        expect(result).toEqual({success:true,tickets:[fakeTicket]})
    })

    test("should return a empty list ", async ()=>{
        ticketDAO.getAllTicketByStatus.mockResolvedValue([])

        const result = await getTicketsByStatus({status:"Pending"})
        expect(result).toEqual({success:true,tickets:[]})
    })

    test("should return object with success false since it failed to get tickets ", async ()=>{
        ticketDAO.getAllTicketByStatus.mockResolvedValue(null)

        const result = await getTicketsByStatus({status:"Pending"})
        expect(result).toEqual({success:false,code:500, message: `Failed to get tickets with status: Pending`})
    })
})

describe("updateTicketStatus", ()=>{
    let fakeTicket;
    beforeEach(()=>{
        fakeTicket = {
            ticketId: "abc123",
            resolver: "null",
            userId: "zxy890",
            description: "Issue with login credentials not working.",
            type: "Technical",
            amount: 150.25,
            status: "Pending",
            createDate: "2025-03-14"
        };
    })

    test("should return object with success true and new ticket", async ()=>{
        ticketDAO.getTicketByTicketId.mockResolvedValue(fakeTicket)
        ticketDAO.updateTicket.mockResolvedValue(true)
        
        const userId = "tempid"
        const status = "Approve"
        const ticketId = "abcd123"
        const returnTicket = {
            ticketId: "abc123",
            resolver: "tempid",
            userId: "zxy890",
            description: "Issue with login credentials not working.",
            type: "Technical",
            amount: 150.25,
            status: "Approve",
            createDate: "2025-03-14"
        }

        const result = await updateTicketStatus(userId,{ticketId,status})
        expect(result).toEqual({success:true, ticket:returnTicket})
    })

    test("should return object with success false and fail to update", async ()=>{
        ticketDAO.getTicketByTicketId.mockResolvedValue(fakeTicket)
        ticketDAO.updateTicket.mockResolvedValue(null)
        
        const userId = "tempid"
        const status = "Approve"
        const ticketId = "abcd123"

        const result = await updateTicketStatus(userId,{ticketId,status})
        expect(result).toEqual({success:false, code:500, message: "Failed to update ticket"})
    })

    test("should return object with success false and Status not pending to update", async ()=>{
        const fakeApprovedTicket = {
            ticketId: "abc123",
            resolver: "null",
            userId: "zxy890",
            description: "Issue with login credentials not working.",
            type: "Technical",
            amount: 150.25,
            status: "Deny",
            createDate: "2025-03-14"
        };
        const userId = "tempid"
        const status = "Approve"
        const ticketId = "abcd123"

        ticketDAO.getTicketByTicketId.mockResolvedValue(fakeApprovedTicket)

        const result = await updateTicketStatus(userId,{ticketId,status})
        expect(result).toEqual({success:false, code:400, message: "Ticket status isnt Pending, cannot be change"})
    })

    test("should return object with success false and ticket doesnt exist", async ()=>{
        const userId = "tempid"
        const status = "Approve"
        const ticketId = "abcd123"

        ticketDAO.getTicketByTicketId.mockResolvedValue(false)

        const result = await updateTicketStatus(userId,{ticketId,status})
        expect(result).toEqual({success:false, code:400, message: "Ticket does not exist"})
    })

    test("should return object with success false and message saying cannot aprove/deny own ticket", async ()=>{
        ticketDAO.getTicketByTicketId.mockResolvedValue(fakeTicket)
        ticketDAO.updateTicket.mockResolvedValue(true)
        
        const userId = "zxy890"
        const status = "Approve"
        const ticketId = "abcd123"

        const result = await updateTicketStatus(userId,{ticketId,status})
        expect(result).toEqual({success: false, code:401, message: "Cannot Approve/Deny own ticket"})
    })
})