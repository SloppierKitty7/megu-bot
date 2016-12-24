module.exports = {
	desc: "Kicks a user",
	usage: "<ID>",
	hidden: false,
	guildOnly: true,
	modOnly: true,
	task(bot, msg, suffix, guild) {
		var _gname = msg.guild.name;
		var _uname = msg.member.user.username;
		//msg.guild.kickMember(suffix);
		bot.getDMChannel(suffix).then(chan => {
						bot.createMessage(chan.id, 'You have been Kicked from **' + _gname + '** by ***' +  _uname + '***'); //If still messages queued send the next one.
								msg.guild.kickMember(suffix);
		}, 300);
	}
};
