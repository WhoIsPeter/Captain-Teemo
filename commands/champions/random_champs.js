const Commando = require("discord.js-commando");

class RandomChampsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "randomchamps",
            group: "champions",
            memberName: "randomchamps",
            description: "Gives everyone in the voice channel a random champion"
        });
    }
    async run(message, args) {
        message.channel.send("Not implemented yet");
    }
}

module.exports = RandomChampsCommand;