const Discord = require('discord.js');
const fetch = require('node-fetch');
const embeds = require(__dirname + "../../extraScripts/embededMessages.js");

module.exports = {
    name: "skinDisplay",
    shortcuts:["sk"],
    description: "Mostra uma imagem da skin de um player.",
    args: ['name'],
    cooldown:0,
    state:{},
    async execute(message, args){
        try{
            var nameId = await (await fetch('https://api.mojang.com/users/profiles/minecraft/' + args[0])).json();
        }catch(err){
            message.channel.send(embeds.errorMessage.setDescription('Nome de user Inválido'));
            console.error(err);
            return;
        }
        const wait = new Discord.MessageEmbed()
            .setColor('#00ff00').setDescription('Carrengando a skin...');

        const embed = new Discord.MessageEmbed()
            .setColor('#54acff').setTitle('Skin de ' + nameId.name)
            .setImage('https://crafatar.com/renders/body/' + nameId.id);

        message.channel.send(wait).then(r=>{
            setTimeout(()=>{
                try{r.delete()}catch(err){throw err}
                message.channel.send(embed)
            },2000)
        })
        
        
    }
}