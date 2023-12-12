import {CrudAction} from "../server-actions/crudactions/crud-action";
import * as edgedb from "edgedb"
import e from "./../dbschema/edgeql-js"
export const compileCommandsUserConfig = function compileCommandsUserConfig(client:edgedb.Client):CrudAction[]{
    // todo add try catch for internal logging => indien fout geprogrammeerd kan dit fout lopen = niet type safe!
    // todo maak dit type safe met behulp van interface generators
    const crudActions:CrudAction[] = []
    const getAllMovies = async function getAllMovies() {
        // todo fix for inList
        const account = e.select(e.Account,(acc)=>({
            id:true,
            watchlist:{id:true},
            filter:e.op(acc.username,'=','Pol')
        }));
        return e.select(e.Movie, (m) => ({
            id: true,
            title: true,
            actors: {name: true},
            release_year: true,
            isInList:e.op(e.count((e.select(account.watchlist,(list)=>({
                id:true,filter:e.op(m.id,'=',list.id)
            })))),'=',1)
        })).run(client)
    }
    crudActions.push(new CrudAction('getAllMovies', getAllMovies))
    const getAllShows = async function getAllShows() {
        return e.select(e.Show, () => ({
            id: true,
            title: true,
            num_seasons:true
        })).run(client)
    }
    crudActions.push(new CrudAction('getAllShows', getAllShows))
    const getAllSeasons = async function getAllSeasons() {
        return e.select(e.Season, () => ({
            id: true,
            number: true,
            show: true,
        })).run(client)
    }
    crudActions.push(new CrudAction('getAllSeasons', getAllSeasons))
    const getAllActors = async function getAllActors() {
        return e.select(e.Person, () => ({
            id: true,
            name: true
        })).run(client)
    }
    crudActions.push( new CrudAction('getAllActors', getAllActors))
    const getAllContent = async function getAllContent() {
        return e.select(e.Content, () => ({
            id: true,
            title: true,
            actors:true,
        })).run(client)
    }
    crudActions.push(new CrudAction('getAllContent', getAllContent))
    return crudActions
}

