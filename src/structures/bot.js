const DiscordClient = require("./discordClient")
const Developer = require("./developer")

module.exports = class Bot {
    /**
     * @type {DiscordClient}
     */
    discord

    /**
     * @type {Number}
     */
    serverCount

    /**
     * @type {Developer}
     */
    developer

    /**
     * @type {Array<Date>}
     */
    upvotes

    /**
     * @type {Array<string>}
     */
    flags

    /**
     * @type {string}
     */
    banner

    /**
     * @type {string}
     */
    website

    /**
     * @type {string}
     */
    support

    /**
     * @type {string}
     */
    prefix

    /**
     * @type {string}
     */
    longdesc

    /**
     * @type {string}
     */
    shortdesc

    /**
     * @type {string}
     */
    invite

    /**
     * @type {string}
     */
    vanity

    /**
     * @type {string}
     */
    theme
}