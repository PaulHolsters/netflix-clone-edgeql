import express, {Request, Response, Application} from 'express';
import {ServerActions} from "../server-actions/server-actions";
import {compileCommandsUserConfig} from "../app-configuration/crud-actions";
import * as edgedb from "edgedb";
import http from "http";

const client = edgedb.createClient()
client.ensureConnected().then(() => {
        compileCommandsUserConfig(client).forEach(c => {
            ServerActions.addAction(c)
        })
        const server = express()
        server.get('/:actionId', (req: Request, res: Response, next) => {
            const action = ServerActions.getAction(req.params.actionId)
            console.log(action, (req.params.actionId))
            if (action) {
                action.command().then(result => {
                    // todo nagaan wat hier de verschillende errors allemaal kunnen zijn en ze dan degelijk afhandelen
                    if (result) {
                        res.status(200).send(result)
                    } else res.status(500)
                }).catch()
            } else res.status(500).send('seriously fucked up')
        })
        const port = Number(process.env.PORT || 3000)
        http.createServer(server).listen(port)
    }
).catch(e => {
    console.log(e)
    throw new Error('could not connect to EdgeDB')
})

