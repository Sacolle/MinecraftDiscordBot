const Discord = require("discord.js");


const serverWatchMessage = new Discord.MessageEmbed()
    .setColor('#00ff00')
	.setTitle('Server de Minecraft')
	.setAuthor('Rapi du Minecraft','https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png' , 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	.setDescription()
	.setThumbnail('https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png')
	.setImage()
	.setFooter('Server Watch Message')
	.setTimestamp();

const serverCheckMessage = new Discord.MessageEmbed()
	.setColor('#23FF00')
	.setDescription()
	.setTimestamp();

const errorMessage = new Discord.MessageEmbed()
	.setColor('#FF0000')
	.setDescription();

const statusMessage = new Discord.MessageEmbed()
	.setColor('#00ff00')
	.setDescription();

module.exports = {
	serverWatchMessage,
	serverCheckMessage,
	errorMessage,
	statusMessage
}
