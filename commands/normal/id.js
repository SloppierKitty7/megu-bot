module.exports = {
	desc: "Shows your discord ID",
	usage: "<text>",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {	
		bot.createMessage(msg.channel.id, "ID for **" + msg.member.mention + "** "+ msg.member.id || 'id');
	}
};

