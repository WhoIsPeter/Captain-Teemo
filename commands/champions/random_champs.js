const Commando = require("discord.js-commando");
const request = require("request");

class RandomChampsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "randomchamps",
            group: "champion",
            memberName: "randomchamps",
            description: "Gives everyone in the voice channel a random champion"
        });
    }
    async run(message, args) {
        let memberVoiceChannel = message.member.voiceChannel;
        if(memberVoiceChannel == undefined) {
            message.channel.send("You must be in a voice channel in order to use this command", {reply: message.member});
            return;
        }
        let URL = `https://la1.api.riotgames.com/lol/static-data/v3/champions?locale=es_MX&dataById=false&api_key=${process.env.RIOT_API_KEY}`;
        let champions = [];
        request(URL, async (error, response, body) => {
            if(!error && response.statusCode == 200) {
                let parsed = JSON.parse(body);
                for(let element in parsed.data) {
                    champions.push(parsed.data[element].name);
                }
                memberVoiceChannel.members.array().forEach( member => {
                    if(!member.user.bot) {
                        let index = Math.floor(Math.random() * 135);
                        message.channel.send(champions[index], {reply: member});
                    }
                }, this);
            } else {
                console.log(error);
                console.log(response);
            }
        });
    }
}

module.exports = RandomChampsCommand;