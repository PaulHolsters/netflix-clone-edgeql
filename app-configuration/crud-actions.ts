import {CrudAction} from "../server-actions/crudactions/crud-action";
import * as edgedb from "edgedb"
import e from "./../dbschema/edgeql-js"
export const crudActions:CrudAction[] = []
const client = edgedb.createClient()
const getAllProducts = async function getAllProducts(){
    await client.ensureConnected()
    return e.select(e.Movie, ()=>({
        id: true,
        title: true,
        actors: { name: true },
        release_year:true
    })).run(client)
}
const getAllProductsCrudAction = new CrudAction('getAllProducts',getAllProducts)
crudActions.push(getAllProductsCrudAction)
