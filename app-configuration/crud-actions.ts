import {CrudAction} from "../server-actions/crudactions/crud-action";
import * as edgedb from "edgedb"
import e from "./../dbschema/edgeql-js"
export const crudActions:CrudAction[] = []
const client = edgedb.createClient()
client.ensureConnected().then(()=> {
    const getAllMovies = async function getAllMovies() {
        return e.select(e.Movie, () => ({
            id: true,
            title: true,
            actors: {name: true,character_name:true},
            release_year: true
        })).run(client)
    }
    const getAllMoviesCrudAction = new CrudAction('getAllMovies', getAllMovies)
    const getAllShows = async function getAllShows() {
        return e.select(e.Show, () => ({
            id: true,
            title: true,
            num_seasons:true
        })).run(client)
    }
    const getAllShowsCrudAction = new CrudAction('getAllShows', getAllShows)
    const getAllSeasons = async function getAllSeasons() {
        return e.select(e.Season, () => ({
            id: true,
            number: true,
            show: true,
        })).run(client)
    }
    const getAllSeasonsCrudAction = new CrudAction('getAllSeasons', getAllSeasons)


    crudActions.push(getAllMoviesCrudAction)
}).catch(err=>console.log(err))

