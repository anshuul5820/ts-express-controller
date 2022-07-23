import express from "express";

//will be singleton class, only 1 instance throughout will be created
export class AppRouter {
    private static instance: express.Router

    static getInstance(): express.Router {
        if (!AppRouter.instance) {
            AppRouter.instance = express.Router()
        }
        return AppRouter.instance
    }
}