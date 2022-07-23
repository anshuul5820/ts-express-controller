import { bodyValidator, controller, get, post, use } from "./decorators";
import { Request, Response, NextFunction } from "express";
import { RequestWithBody } from "../routes/loginRoutes";

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('req was made')
    next()
}

//controller route prefixes all routes defined inside class:
//ex: controller route /auth -> /auth/1 /auth/2
@controller('/auth')
export class LoginController {

    //corner case: associating a route with incorrect handler
    //this code is gonig to hang the server
    //soln: use propDesc attr in get('/') decorator
    // @get('/')
    // add(a: number, b: number): number {
    //     return a + b
    // }

    @get('/login')
    @use(logger)
    getLogin(req: Request, res: Response): void {
        res.send(`
        <form method='POST'>
            <div>
            <label>Email</label>
            <input name='email'/>
            </div>
            <div>
            <label>Password</label>
            <input name='password' type='password'/>
            </div>
            <button>Submit</button>
        </form>
        `)
    }

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: RequestWithBody, res: Response) {
        const { email, password } = req.body

        if (email === 'hi@hi.com' && password === 'password') {
            //mark as logged in
            req.session = { loggedIn: true }
            res.redirect('/')

            //redirect to '/'
            res.send(email + password)
        }
        else
            res.send('provide email and password')
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = undefined
        res.redirect('/')
    }
}