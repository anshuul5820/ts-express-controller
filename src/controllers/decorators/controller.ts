import 'reflect-metadata'
import express, { NextFunction, Request, RequestHandler, Response } from 'express'
import { AppRouter } from '../../AppRouter'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'

function bodyValidators(keys: string): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send('invalid reqeuest')
            return
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`Missing property ${key}`)
                return
            }
        }
        next()
    }
}

export function controller(routePrefix: string) {
    //constructor function-> so type=Function
    return function (target: Function) {
        const router = AppRouter.getInstance()
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key]

            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key)
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || []
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || []

            const validator = bodyValidators(requiredBodyProps)

            //all keys in target.prototype might not be paths
            if (path)
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler)

        }
    }
}