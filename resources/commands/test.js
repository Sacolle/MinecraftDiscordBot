const Discord= require("discord.js");

module.exports = {
    name: "test",
    shortcuts:["t"],
    description: 'test',
    args: ['state'],
    state:[],
    execute(message,args){
	message.channel.send(`Este é um teste e o seu arg foi ${args}`);
    }
}
