const {authorizeRole} = require('../../src/Middleware/AuthRoleMiddleware')

describe("authorizeRole", ()=>{
    let res;
    let req;
    let next;
    beforeEach(()=>{
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        req={
            locals: {
                tokenDetail: {
                    role: ''
                }
            }
        }
        next = jest.fn()
    })
    afterEach(()=>{
        jest.clearAllMocks()
    })

    test("should call next",()=>{
        req.locals.tokenDetail.role = 'Manager';
        
        const middleware = authorizeRole("Manager")
        middleware(req,res,next);

        expect(next).toHaveBeenCalled()
    })
    test("should return with status 403 and a message",()=>{
        req.locals.tokenDetail.role = 'Employee';
        
        const middleware = authorizeRole("Manager")
        middleware(req,res,next);

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Employee cannot access this"})
    })
})