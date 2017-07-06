const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const request = require("request");
const fs = require("fs");


class LinkAccountCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "linkaccount",
            group: "summoner",
            memberName: "linkaccount",
            args: [{
                key: "summonerName",
                prompt: "Insert a summoner name to search",
                type: "string"
            }],
            description: "Links the League of legends profile"
        });
    }
    async run(message, args) {
        const {summonerName} = args;
        let URL = `https://la1.api.riotgames.com/lol/static-data/v3/versions?api_key=${process.env.RIOT_API_KEY}`;
        let version;
        request(URL, (error, response, body) => {
            if(!error && response.statusCode == 200) {
                let parsed = JSON.parse(body);
                version = parsed[0];
            } else {
                console.log(error);
            }
        });
        URL = `https://la1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`;
        request(URL, (error, response, body) => {
            if(!error && response.statusCode == 200) {
                let parsed = JSON.parse(body);

                // APPEND NEW ACCOUNT
                let file = fs.readFileSync("./accounts.json");
                let accounts = JSON.parse(file);
                accounts[message.author] = parsed;
                let fileJSON = JSON.stringify(accounts);
                fs.writeFileSync("./accounts.json", fileJSON);

                let name = parsed.name;
                let icon = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${parsed.profileIconId}.png`;
                let embed = new Discord.RichEmbed();
                embed.setAuthor(name, icon);
                message.channel.send("League of legends profile", {embed: embed});
            } else {
                console.log(error);
            }
        });
    }
}

module.exports = LinkAccountCommand;