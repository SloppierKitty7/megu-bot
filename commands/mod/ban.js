module.exports = {
	desc: "Bans a user",
	usage: "<ID> (Some text)",
	hidden: false,
	guildOnly: true,
	modOnly: true,
	task(bot, msg, suffix, guild) {
		var _gname = msg.guild.name;
		var _uname = msg.member.user.username;
		//msg.guild.kickMember(suffix);
		bot.getDMChannel(suffix.substring(18,0)).then(chan => {
						re = /\((.*)\)/;
						bot.createMessage(chan.id, 'You have been Banned from **' + _gname + '** by ***' +  _uname + '*** \n **Reason** ```' + suffix.match(re)[1] + '```');
								msg.guild.banMember(suffix.substring(18,0));
		}, 300);
	}
};