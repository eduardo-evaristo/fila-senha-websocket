//Importing WebSocket lib
import WebSocket from "ws";
import { config } from "dotenv";

//Getting .env file
config();

//Creating web socket server on port 8080 (defined in root/.env)
const port: number = Number(process.env.PORT);
const server = new WebSocket.Server({ port });

export default server;
