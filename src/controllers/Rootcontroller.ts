import { NextFunction, Request, Response } from "express"
import { controller, get, use } from "./decorators"

function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.loggedIn) {
        next()
        return//indicates other engikneers not returning anything
    }

    res.status(403).send('not permitted')
}

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
            <div>
            <div>Logged in</div>
            <a href='/auth/logout'>Logout</a>
            </div>
            `)
        }
        else {
            res.send(`
            <div>
            <div>Not Logged in</div>
            <a href='/auth/login'>Login</a>
            </div>
            `)
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to protected route')
    }
}