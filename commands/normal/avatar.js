module.exports = {
	desc: "Shows a users discord avatar",
	usage: "<@user> Or leave blank for your avatarURL",
	hidden: false,
	guildOnly: true,
	ownerOnly: false,
	task(bot, msg, suffix) {	
		if (msg.mentions == "") {
			//bot.createMessage(msg.channel.id, "you need to mention someone");
			bot.createMessage(msg.channel.id, 'AvatarURL for '+ msg.member.user.username +' is ' + msg.member.user.avatarURL );	
		} else{
			bot.createMessage(msg.channel.id, 'AvatarURL for '+ msg.mentions[0].username +' is ' + msg.mentions[0].avatarURL );	
		}
	}
};