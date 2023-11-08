import express from "express"
import cors from "cors"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { Routes } from "./routes"
import cookieParser from 'cookie-parser';

// create express app
const app = express()
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors({ 
    origin: process.env.CLIENT_URI,
    credentials: true
}));

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
})

const port = process.env.PORT;

// start express server
app.listen(Number(port))

console.log("Express server has started on port " + port);
