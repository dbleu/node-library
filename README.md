<h1 align="center">discord-botlist.eu api</h1>
<br />
Welcome 👋 <br />
This package offers you a more user friendly and easier way to interact with the discord-botlist.eu HTTP api. It's made by their developer.

## Install
```
npm i @dbleu/node
```

## Getting started
```JS
const API = require("@dbleu/node")
const dbleu = new API("Your API-Token")


// Get an array with all dates when the bot was voted for
dbleu.getVotes().then(votes => {
  console.log(votes)
})

// Get the current information about the bot
dbleu.ping().then(data => {
  console.log(data)
})

// Update the bot stats
dbleu.updateStats(serverCount).then(data => {
  console.log(data)
})
```

---

`.getVotes()` <br />
| Parameter | Type |
| --- | --- |
| _none_ | _none_ |

> `Promise<Array>`

---

`.ping()` <br />
| Parameter | Type |
| --- | --- |
| _none_ | _none_ |

> <code>Promise<<a href="https://github.com/DiscordBotlistEU/node-library/blob/main/src/structures/bot.js">Bot</a>></code>

---

`.updateStats(serverCount)` <br />
| Parameter | Type |
| --- | --- |
| serverCount |`Number` or `string` |

> ```
> {
>   "updated": Array<string>,
>   "bot": Bot
> }
> ```
[Bot](https://github.com/DiscordBotlistEU/node-library/blob/main/src/structures/bot.js)
