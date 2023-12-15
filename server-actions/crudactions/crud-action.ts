import {ActionIdType} from "../../types/aliases";

export class CrudAction{
    constructor(public id:ActionIdType,
                public command:(id:string|undefined)=>Promise<Object|null>
    ) {
    }
}