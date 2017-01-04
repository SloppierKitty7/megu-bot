var reload		= require('require-reload')(require),
	cleverbot	= reload('../special/cleverbot.js'),
	level	= reload('../special/level.js');

module.exports = {
	handler(bot, msg, CommandManagers, config, settingsManager) {
		if (msg.author.bot === true)
			return;

		for (let i = 0; i < CommandManagers.length; i++) {
			if (msg.content.startsWith(CommandManagers[i].prefix))
				return CommandManagers[i].processCommand(bot, msg, config, settingsManager);
		}

		if (config.cleverbot && msg.channel.guild === undefined || (msg.mentions.length !== 0 && msg.content.search(new RegExp(`^<@!?${bot.user.id}>`)) === 0))
			cleverbot(bot, msg, config, settingsManager);
		//else if (msg.content === msg.content)
				//level(bot, msg, config, settingsManager);
	},
	reloadCleverbot(bot, channelId) {
		try {
			cleverbot = reload('../special/cleverbot.js');
			bot.createMessage(channelId, "Reloaded special/cleverbot");
		} catch(error) {
			console.error(error);
			bot.createMessage(channelId, `Error reloading cleverbot: ${error}`);
		}
	}
}
