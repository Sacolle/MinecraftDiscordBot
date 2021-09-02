const fs = require('fs');
const skin = require(__dirname + '../../extraScripts/skinDisplay');
/*
module.exports = {
    name: "linkme",
    shortcuts:["lm"],
    cooldown: 5,
    description: "Lika o seu nome do discord com o do minecraft, abrindo novas funcionalidades ao bot.",
    async execute(message, args){
        try{ 
            var UUIDresp = await skin.validUsername(args[0])
        }catch(err){
            console.error(err)
        }

        if(UUIDresp.status == 204){ 
            message.channel.send('Nickname não encontrado'); 
            return;
        }else if(UUIDresp.status == 404){ 
            message.channel.send('Nome com caracteres inválidos');
            return;
        }else if(UUIDresp.status != 200){
            message.channel.send('Erro');
            return; 
        }

        const skinHeadURL = await skin.fetchSkinURL(UUIDresp);
        
        fs.readFile(__dirname + "../../data/userdata.json",'utf-8',(err,data)=>{
            if(err) throw err;
            const userInfo = JSON.parse(data);

            userInfo[message.author.id] = {
                mineName: args[0],
                skinHeadURL: skinHeadURL
            };

            fs.writeFile(__dirname + "../../data/userdata.json",JSON.stringify(userInfo),(err)=>{
                if(err) throw err;
                console.log("the file has been updated");
                message.channel.send(`Você linkou ${args} ao seu nome`);
            });        
        })
    }
}*/