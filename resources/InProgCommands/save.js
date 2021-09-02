const mineUtil = require("minecraft-server-util");

module.exports = {
    name: "save",
    shortcuts:["s"],
    description: "Salva infos do server `>save [ip do server] as [nome do server]`",
    async execute(message, args){
        if(args[1] != 'as'){
            //see how to do a error message
            message.channel.send("invalid syntax");
            return;
        }
        try{
            var servAnsw = await mineUtil.status(args[0]);
        }catch(err){
            console.error(err)
        }

    }
}