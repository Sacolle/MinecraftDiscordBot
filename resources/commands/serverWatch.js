const Discord= require("discord.js");
const canvas = require(__dirname + '../../extraScripts/canvasProcess.js');
const mineUtil = require("minecraft-server-util");
const embeds = require(__dirname + "../../extraScripts/embededMessages.js");

module.exports = {
    name: "serverwatch",
    shortcuts:["sw"],
    description: "Observa um servidor, enviando uma embeded message que muda quando novos playes entram.",
    args: ["ip"],
    altArgs: ['cancel'],
    cooldown:0,
    state:{},
    execute(message, args){
        const id = message.guild.id;
        if(this.state[id] == undefined){
            this.state[id] = {
                ip:'0',
                players:undefined,
                timoutID:0,
                serverMessage:undefined,
                startTime:0
            }
        }
        if(args[0] == 'cancel'){
            if(this.state[id].timoutID == undefined){
                message.channel.send(embeds.statusMessage.setDescription('Não estou observando nenhum server.'));
                return;
            }
            clearTimeout(this.state[id].timoutID);
            this.reset(id);
            message.channel.send(embeds.statusMessage.setDescription('Server Watch cancelado.'));
            return;
        }
        if(this.state[id].ip != args[0] && this.state[id].ip != '0'){
            message.channel.send(embeds.statusMessage.setDescription('Já estou observando um server, digite `>serverwatch cancel` para parar.'));
            return;
        }

        mineUtil.status(args[0]).then(r=>{
            
            if(this.state[id].ip == '0')this.state[id].ip = args[0];
            if(this.state[id].startTime == 0)this.state[id].startTime = Date.now();

            if(this.state[id].startTime - Date.now() > 3600000){
                this.reset(id);
                return;
            }

            if(this.state[id].players != undefined){
                if(this.state[id].players == r.onlinePlayers){
                    this.state[id].timoutID = setTimeout(()=>this.execute(message, args),10000);
                    return;
                }
            }

            if(this.state[id].serverMessage != undefined)this.state[id].serverMessage.delete();

            canvas.createOnlinePlayersDisplay(r).then(resp=>{
                const attachment = new Discord.MessageAttachment(resp.toBuffer(),'playersOnline.png');
                try{
                    var embed = new Discord.MessageEmbed(embeds.serverWatchMessage)
                        .attachFiles(attachment)
                        .setImage('attachment://playersOnline.png')
                        .setDescription(`**Ip**: ${r.host}\n**Versão**: ${r.version}\n**Descrição**: ${
                            r.description.descriptionText}\n**Players**: ${r.onlinePlayers}/${r.maxPlayers}`);
                }catch(err){
                    throw err;
                }

                message.channel.send(embed).then(msg=>this.state[id].serverMessage = msg);
                this.state[id].timoutID = setTimeout(()=>this.execute(message, args),10000);
            })

            this.state[id].players = r.onlinePlayers;            

        }).catch(r=>{
            this.reset(id);
            message.channel.send(embeds.errorMessage.setDescription('Ip errado ou servidor offline.'));
        });
    },
    reset(session){
        delete this.state[session];
    }
}
