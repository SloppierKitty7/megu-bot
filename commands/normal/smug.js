module.exports = {
	desc: "gets a random sumg photo from smug.moe",
	usage: "<text>",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {	
		bot.createMessage(msg.channel.id, "http://smug.moe/smg/"+ ran() +".png" || 'Smug');
	}
};

function ran(p1) {
	return Math.floor((Math.random() * 58) + 1);
}
