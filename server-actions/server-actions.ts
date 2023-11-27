import {CrudAction} from "./crudactions/crud-action";
import {ActionIdType} from "../types/aliases";

export class ServerActions{
    private static serverActions:CrudAction[]=[]
    public static addAction(action:CrudAction){
        this.serverActions.push(action)
    }
    public static getAction(id:ActionIdType):CrudAction|undefined{
        return this.serverActions.find(sa=>sa.id===id)
    }
}