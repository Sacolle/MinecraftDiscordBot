const Discord = require("discord.js");
const fs = require("fs");
const JSONVars = require("./config.json");
const embMsgs = require("./resources/extraScripts/embededMessages");

const client = new Discord.Client({disableEveryone: false});
client.commands = new Discord.Collection();
client.login(JSONVars.BOT_TOKEN);


client.on("ready",()=>{
    console.log(client.guilds.cache.map(guild=>guild.id));
    const commandFiles = fs.readdirSync("./resources/commands/").filter(file=>file.endsWith('.js'));
    for (const file of commandFiles){
        const command = require(`./resources/commands/${file}`);
        client.commands.set(command.name, command);
    }
});

client.on("message" , (msg)=>{
    if(!msg.content.startsWith(JSONVars.PREFIX) || msg.author.bot)return;

    const args = msg.content.slice(JSONVars.PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.shortcuts && cmd.shortcuts.includes(commandName));
    if(!command)return;
    try{
        command.execute(msg,args);
    }catch{
        msg.channel.send(embMsgs.errorMessage.setDescription("Incorrect arguments | try `>" + command.name +
            " " + command.args.join(" ") + "`" + command.altArgs == undefined ?"" :
            "or `>" + command.name + " " + command.altArgs.join(" ") + "`"));
    }
});