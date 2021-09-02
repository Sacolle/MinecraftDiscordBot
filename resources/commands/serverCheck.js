const mineUtil = require("minecraft-server-util");
const embMsgs = require(__dirname + "../../extraScripts/embededMessages");

module.exports = {
    name: "servercheck",
    shortcuts:["sc"],
    description: "Checks if a server is online",
    args: ["ip"],
    cooldown:0,
    state:{},
    execute(message, args){
        mineUtil.status(args[0]).then((resp)=>{
            message.channel.send(`O servidor está aberto na ${
                resp.rawResponse.version.name}, demora da resposta: ${resp.roundTripLatency}ms`);
        }).catch((err)=>{
            message.channel.send(embMsgs.errorMessage
                .setDescription(`Server not found.`))
                .catch(error=>console.error(error));
            console.log(err);
        });
    }
}