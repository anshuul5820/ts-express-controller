"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return; //indicates other engineers not returning anything
    }
    res.status(403).send('not permitted');
}
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
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
    </form>`);
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password && email === 'hi@hi.com' && password === 'password') {
        //mark as logged in
        req.session = { loggedIn: true };
        res.redirect('/');
        //redirect to '/'
        res.send(email + password);
    }
    else
        res.send('provide email and password');
});
router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
        <div>Logged in</div>
        <a href='/logout'>Logout</a>
        </div>
        `);
    }
    else {
        res.send(`
        <div>
        <div>Not Logged in</div>
        <a href='/login'>Login</a>
        </div>
        `);
    }
});
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, (req, res) => {
    res.send('Welcome to protected route');
});
