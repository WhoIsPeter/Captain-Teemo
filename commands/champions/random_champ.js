const Commando = require("discord.js-commando");
const request = require("request");

class RandomChampCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "randomchamp",
            group: "champions",
            memberName: "randomchamp",
            description: "Sends a random champions"
        });
    }
    async run(message, args) {
        let URL = `https://la1.api.riotgames.com/lol/static-data/v3/champions?locale=es_MX&dataById=false&api_key=${process.env.RIOT_API_KEY}`;
        let champions = [];
        request(URL, async (error, response, body) => {
            let parsed = JSON.parse(body);
            for(let element in parsed.data) {
                champions.push(parsed.data[element].name);
            }
            let index = Math.floor(Math.random() * 135);
            message.reply(champions[index]);
        });
    }
}

module.exports = RandomChampCommand;