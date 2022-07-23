import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'
import { RequestHandler } from 'express'

export function use(middleware: RequestHandler) {
    return function (target: any, key: string, propDesc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(
            MetadataKeys.middleware,
            target,
            key) || []

        // middlewares.push(middleware)
        // Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, key)

        Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key)
    }
}
