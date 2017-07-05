const Commando = require("discord.js-commando");
const client = new Commando.Client({owner: process.env.OWNER_ID});

client.registry.registerGroups([
        ["champion", "Champion"],
        ["summoner", "Summoner"]
    ]);
client.registry.registerDefaults();
client.registry.registerCommandsIn(process.cwd() + "/commands");

client.login(process.env.BOT_TOKEN);