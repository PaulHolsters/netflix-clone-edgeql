import express, {  Request, Response , Application } from 'express';
import {ServerActions} from "../server-actions/server-actions";
import {crudActions} from "../app-configuration/crud-actions";

const server:Application = express()
crudActions.forEach(c=>{
    ServerActions.addAction(c)
})

server.get('/:actionId',(req:Request,res:Response,next)=>{
    const action = ServerActions.getAction(req.params.actionId)
    if(action){
        action.command().then(result=>{
            // todo nagaan wat hier de verschillende errors allemaal kunnen zijn en ze dan degelijk afhandelen
            if(result){
                res.status(200).send(result)
            } else res.status(500)
        }).catch()
    } else res.status(500).send('seriously fucked up')
})

export default server
