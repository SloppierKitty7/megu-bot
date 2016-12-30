const libVersion = require('../../node_modules/eris/package.json').version,
	botVersion = require('../../package.json').version;

module.exports = {
	desc: "Tells you about the bot.",
	cooldown: 5,
	task(bot, msg) {
		bot.createMessage(msg.channel.id, `\`\`\`md
# Megu-bot

[ CREATOR ](SloppierKitty7)
[ LIBRARY ](Eris v${libVersion})
[ VERSION ](${botVersion})

Megu-bot is a multipurpose bot to handle most of your needs.
If you have any feedback or suggestions head over to my server
For a list of commands do !help

[ WEBSITE ](megu.pixelisk.net)
[ SERVER  ]( https://discord.gg/5PN6dRz )
\`\`\``);
	}
};
