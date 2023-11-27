import * as http from "http";
import server from "./request-handling";

const port = Number(process.env.PORT || 3000)
http.createServer(server).listen(port)
// todo put and pull on github!