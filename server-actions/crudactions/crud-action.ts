import {ActionIdType} from "../../types/aliases";

export class CrudAction{
    constructor(public id:ActionIdType,public command:()=>Promise<Object|null>) {
    }
}