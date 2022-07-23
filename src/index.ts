import './controllers/LoginController';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import { AppRouter } from './AppRouter';

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['laskdjf'] }));
app.use(router);
app.use(AppRouter.getInstance());

app.listen(3000, () => {
    console.log('listening on port 3000')
})

//lecture 228- explanaton of prototypal inheritance & weird properties of class