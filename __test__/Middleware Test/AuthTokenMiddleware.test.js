const authorizeTokenMiddleware = require('../../src/Middleware/AuthTokenMiddleware')
const jtw = require('jsonwebtoken')

//jest.mock('jsonwebtoken')

describe("authenticateToken", ()=>{
    let req;
    let res;
    let next;
    beforeEach(()=>{
        req = {
            headers:{
                "authorization": "Bearer faketoken"
            }
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        next= jest.fn()
    })

    afterEach(()=>{
        jest.clearAllMocks()
    })

    test("should fill local and then call next", async ()=>{
        const decodeToken = {
            userId: "fakeid",
            role: "manager"
        }
        jest.spyOn(jtw,'verify').mockResolvedValue(decodeToken)
        
        const middleware = authorizeTokenMiddleware.authenticateToken
        await middleware(req,res,next)

        expect(req.locals.tokenDetail).toEqual(decodeToken)
        expect(next).toHaveBeenCalled()
    })

    test("should return 403 invalid token", async ()=>{

        jest.spyOn(jtw,'verify').mockRejectedValue(new Error("Testing Error"))
        
        const middleware = authorizeTokenMiddleware.authenticateToken
        await middleware(req,res,next)

        expect(res.status).toHaveBeenCalledWith(403)
        expect(res.json).toHaveBeenCalledWith({message:"Forbidden Access: Invalid Token"})
    })

    test("should return 403 forbiden access", async ()=>{
        req.headers.authorization = '';

        const middleware = authorizeTokenMiddleware.authenticateToken
        await middleware(req,res,next)

        expect(res.status).toHaveBeenCalledWith(403)
        expect(res.json).toHaveBeenCalledWith({message:"Forbidden Access"})
    })
})