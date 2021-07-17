const fetch = require("node-fetch")
const Bot = require("./structures/bot")
const config = require("./utils/config.json")

module.exports = class Dbleu {
    /**
     * @type {string}
     * @private
     */
    token

    /**
     * @param {string} token - The API-Token for discord-botlist.eu
     */
    constructor(token) {
        this.token = token
    }

    /**
     * Get all dates of the upvotes for the Bot
     * @returns {Promise<Array<Date>>}
     */
    getVotes() {
        return new Promise((resolve, reject) => {
            fetch(`${config.endpoints}/${config.version}/votes`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            }).then(async res => {
                if (res.status !== 200) return reject(`${res.status}: ${(await res.json()).message}`)
                resolve(await res.json())
            })
        })
    }

    /**
     * Get all dates of the upvotes for the Bot
     * @returns {Promise<Bot>}
     */
    ping() {
        return new Promise((resolve, reject) => {
            fetch(`${config.endpoints}/${config.version}/ping`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            }).then(async res => {
                if (res.status !== 200) return reject(`${res.status}: ${(await res.json()).message}`)
                resolve(await res.json())
            })
        })
    }

    /**
     * Update the stats for your Bot
     * @param {Number|string} serverCount 
     * @returns {Promise<Bot>}
     */
    updateStats(serverCount) {
        return new Promise((resolve, reject) => {
            fetch(`${config.endpoints}/${config.version}/update`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serverCount: serverCount
                })
            }).then(async res => {
                if (res.status !== 200) return reject(`${res.status}: ${(await res.json()).message}`)
                resolve(await res.json())
            })
        })
    }
}