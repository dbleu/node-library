var WebSocketClient = require('websocket').client;
const wsclient = new WebSocketClient();
const EventEmitter = require("events")
const gateway = "https://dbl.v-server.io:34"
var loggedin = false
var con;
var bid;

class Client extends EventEmitter {
    login(APItoken, botID) {
        wsclient.connect(gateway, "echo-protocol")
        wsclient.on("connect", (connection) => {
            connection.send(JSON.stringify({
                type: "login",
                token: APItoken,
                bot: botID
            }))

            connection.on("message", req => {
                const msg = JSON.parse(req.utf8Data)

                if (msg.type == "error") throw new Error(msg.message)
                if (msg.type == "vote") {
                    this.emit("vote", msg.vote)
                }
                if (msg.type == "updated") this.emit("update", JSON.parse(msg.data))
                if (msg.type == "login") {
                    loggedin = true
                    con = connection
                    bid = botID
                    this.emit("ready")
                }
            })
        })
    }
    
    autoPost(client, req){
        if (!con) throw new Error("Please login before you post your Data!")
        setInterval(function(){
        con.send(JSON.stringify({
            type: "postData",
            data: JSON.stringify({
                server_count: client.guilds.cache.size,
                shard_count: 0,
                botid: bid
            })
        }))
        console.log("Posted data: Servers: " + client.guilds.cache.size)
        },30000)
    }
    

    postData(serverCount, shardCount) {
        if (!serverCount) throw new Error("The argument serverCount is missing!")
        if (!shardCount) throw new Error("The argument shardCount is missing!")
        if (!con) throw new Error("Please login before you post your Data!")

        con.send(JSON.stringify({
            type: "postData",
            data: JSON.stringify({
                server_count: serverCount,
                shard_count: shardCount,
                botid: bid
            })
        }))
    }
}

module.exports = {
    Client
}