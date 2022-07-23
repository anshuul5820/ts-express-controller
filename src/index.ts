import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Request, Response } from 'express'
import { router } from './routes/loginRoutes'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['sdfhshdf'] }))
app.use(router)

app.listen(3000, () => {
    console.log('listening on port 3000')
})

//lecture 228- explanaton of prototypal inheritance & weird properties of class