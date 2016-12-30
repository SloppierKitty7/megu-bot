module.exports = {
	desc: "Get a users id",
	usage: "<@user>",
	hidden: false,
	guildOnly: true,
	ownerOnly: false,
	task(bot, msg, suffix) {	
		if (msg.mentions == "") {
			//bot.createMessage(msg.channel.id, "you need to mention someone");
			bot.createMessage(msg.channel.id, 'ID for '+ msg.member.user.username +' is `' + msg.member.user.id + '`');	
		} else{
			bot.createMessage(msg.channel.id, 'ID for '+ msg.mentions[0].username +' is `' + msg.mentions[0].id + '`');	
		}
	}
};