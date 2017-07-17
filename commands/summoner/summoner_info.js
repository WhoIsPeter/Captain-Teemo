const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const request = require("request");
const fs = require("fs");

function doRequest(URL) {
    return new Promise((resolve, reject) => {
        request(URL, (error, response, body) => {
            if(!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    })
};

class SummonerInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "summonerinfo",
            group: "summoner",
            memberName: "summonerinfo",
            description: "Retrieves summoner information of the linked account" // Que es esto?????? CAMBIARLO!!!
        })
    }
    async run(message, args) {
        let file = fs.readFileSync("./accounts.json");
        let accounts = JSON.parse(file);
        if(accounts[message.author]) {
            let account = accounts[message.author];
            let version;
            let URL = `https://la1.api.riotgames.com/lol/static-data/v3/versions?api_key=${process.env.RIOT_API_KEY}`;
            let body = await doRequest(URL);
            let parsed = JSON.parse(body);
            version = parsed[0];
            let embed = new Discord.RichEmbed();
            let icon = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${account.profileIconId}.png`;

            // Acquiring summoner's league
            body = await doRequest("https://la1.api.riotgames.com/lol/league/v3/positions/by-summoner/6012160?api_key=RGAPI-b2fbc25e-9eaf-4d76-aa69-0c260670932a");
            parsed = JSON.parse(body);
            console.log(parsed[0].tier);
            
            embed.setImage("https://raw.githubusercontent.com/WhoIsPeter/Captain-Teemo/master/Leagues/silver/silver_1.png"); // TERMINAR DE CODEAR ESTA LINEA
            embed.setAuthor(account.name, icon);
            message.channel.send({embed: embed});
        } else {
            message.reply("Link your league of legends account first");
        }
    }
}

module.exports = SummonerInfoCommand;