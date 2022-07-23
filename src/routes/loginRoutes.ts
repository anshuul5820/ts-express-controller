import { Router, Request, Response, NextFunction } from "express";

//fixing incorrect types for req.body
interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.loggedIn) {
        next()
        return//indicates other engineers not returning anything
    }

    res.status(403).send('not permitted')
}

const router = Router()

router.get('/login', (req: Request, res: Response) => {
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
    </form>`
    )
})

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body

    if (email && password && email === 'hi@hi.com' && password === 'password') {
        //mark as logged in
        req.session = { loggedIn: true }
        res.redirect('/')

        //redirect to '/'
        res.send(email + password)
    }
    else
        res.send('provide email and password')
})

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
        <div>Logged in</div>
        <a href='/logout'>Logout</a>
        </div>
        `)
    }
    else {
        res.send(`
        <div>
        <div>Not Logged in</div>
        <a href='/login'>Login</a>
        </div>
        `)
    }
})

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined
    res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to protected route')
})

export { router }