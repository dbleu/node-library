import { EventEmitter } from "events";
import * as discord from "discord.js";
import * as websoc from "websocket";

interface ClientEvents {
    ready: [];
    vote: [{ name: string, id: string }];
    update: [object]
}

declare export class Client extends EventEmitter {
    public wsclient: websoc.client;
    public con: websoc.connection;
    public bid: string;
    public loggedin: boolean;

    public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;

    public login(APItoken: string, botID: string): void;
    public autoPost(client: discord.Client): void;
    public postData(serverCount: number, shardCount: number): void;
}

export = { Client };