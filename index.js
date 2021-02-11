var WebSocketClient = require('websocket').client;
const EventEmitter = require("events")
const gateway = "https://dbl.v-server.io:34"

class Client extends EventEmitter {
    wsclient;
    con;
    bid;
    loggedin;

    constructor() {
        super();
        this.wsclient = new WebSocketClient();
        this.loggedin = false
    }

    login(APItoken, botID) {
        this.wsclient.connect(gateway, "echo-protocol")
        this.wsclient.on("connect", (connection) => {
            connection.send(JSON.stringify({
                type: "login",
                token: APItoken,
                bot: botID
            }));

            connection.on("message", req => {
                const msg = JSON.parse(req.utf8Data);

                switch (msg.type) {
                    case "login":
                        this.loggedin = true
                        this.con = connection
                        this.bid = botID
                        this.emit("ready")
                        break;

                    case "updated":
                        this.emit("update", JSON.parse(msg.data));
                        break;

                    case "vote":
                        this.emit("vote", JSON.parse(msg.vote.user))
                        break;

                    case "error":
                        throw new Error(msg.message);

                    default:
                        console.log(msg);
                }
            })
        })
    }

    autoPost(client, req) {
        if (!this.con) throw new Error("Please login before you post your Data!");
        var c = this.con;
        setInterval(function() {
            c.send(JSON.stringify({
                type: "postData",
                data: JSON.stringify({
                    server_count: client.guilds.cache.size,
                    shard_count: 0,
                    botid: this.bid
                })
            }))
            console.log("Posted data: Servers: " + client.guilds.cache.size)
        }, 30000)
    }


    postData(serverCount, shardCount) {
        if (!serverCount) throw new Error("The argument serverCount is missing!")
        if (!shardCount) throw new Error("The argument shardCount is missing!")
        if (!this.con) throw new Error("Please login before you post your Data!")

        this.con.send(JSON.stringify({
            type: "postData",
            data: JSON.stringify({
                server_count: serverCount,
                shard_count: shardCount,
                botid: this.bid
            })
        }))
    }
}

module.exports = {
    Client
}