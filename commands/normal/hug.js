module.exports = {
	desc: "Hug",
	usage: "<text>",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {
		bot.createMessage(msg.channel.id, "*hugs " + suffix  + "* :hearts:" || 'hug');
	}
};
