//Validates the message and updates the setting.
function updateWelcome(bot, msg, suffix, settingsManager) {
	if (suffix.toLowerCase() === 'disable') {
		settingsManager.setWelcome(msg.channel.guild.id)
			.then(() => bot.createMessage(msg.channel.id, '⚙ Welcome message disabled'));
	} else if (suffix.toLowerCase() === 'check') {
		let settings = settingsManager.getWelcome(msg.channel.guild, undefined, true);
		bot.createMessage(msg.channel.id, settings === null
			? 'You do not have a welcome message set.'
			: `**Current welcome message:**\nChannel: ${settings[0] === 'DM' ? 'DM' : `<#${settings[0]}>`}\nMessage: ${settings[1]}`);
	} else {
		let newWelcome = suffix.replace(/(<#[0-9]+>|DM)/i, '').trim();
		if (suffix === '')
			bot.createMessage(msg.channel.id, 'Please format your message in this format: `welcome <#channel | DM> <message>`');
		else if (msg.channelMentions.length === 0 && !suffix.toLowerCase().startsWith('dm'))
			bot.createMessage(msg.channel.id, 'Please specify a channel to send the welcome message to.');
		else if (!newWelcome)
			bot.createMessage(msg.channel.id, 'Please specify a welcome message.');
		else if (newWelcome.length >= 1900)
			bot.createMessage(msg.channel.id, "Sorry, your welcome message needs to be under 1,900 characters.");
		else {
			settingsManager.setWelcome(msg.channel.guild.id, suffix.toLowerCase().startsWith('dm') ? 'DM' : msg.channelMentions[0], newWelcome)
				.then(() => bot.createMessage(msg.channel.id, `⚙ Welcome message set to:\n${newWelcome} **in** ${suffix.toLowerCase().startsWith('dm') ? 'a DM' : '<#' + msg.channelMentions[0] + '>'}`));
		}
	}
}

function handleEventsChange(bot, msg, suffix, settingsManager) {
	if (suffix.toLowerCase() === 'disable') {
		settingsManager.setEventChannel(msg.channel.guild.id);
		bot.createMessage(msg.channel.id, '⚙ Events disabled');
	} else if (suffix.toLowerCase() === 'check') {
		let settings = settingsManager.getGuildsEvents(msg.channel.guild.id);
		bot.createMessage(msg.channel.id, settings === null ? 'You do not have event logging enabled.' : `**Event settings for this server**
Channel: <#${settings.channelId}>
${settingsManager.eventList.map(e => `${e}: ${settings.subbed.includes(e) === true ? 'subscribed' : 'not subscribed'}`).join('\n')}`);
	} else {
		if (msg.channelMentions.length > 0) {
			settingsManager.setEventChannel(msg.channel.guild.id, msg.channelMentions[0]);
			bot.createMessage(msg.channel.id, `⚙ Events will be posted in <#${msg.channelMentions[0]}> now`);
		}
		if (/\+[^ ]/.test(suffix)) {
			settingsManager.subEvents(suffix.match(/(\+[^ ]+)/g), msg.channel)
				.then(events => { bot.createMessage(msg.channel.id, `Subscribed to: \`${events.join('` `')}\``); })
				.catch(e => { bot.createMessage(msg.channel.id, e); });
		} if (/\-[^ ]/.test(suffix)) {
			settingsManager.unsubEvents(suffix.match(/(-[^ ]+)/g), msg.channel)
				.then(events => { bot.createMessage(msg.channel.id, `Unsubscribed from: \`${events.join('` `')}\``); })
				.catch(e => { bot.createMessage(msg.channel.id, e); });
		}
	}
}

function updateNSFWSetting(bot, msg, suffix, settingsManager) {
	if (!suffix)
		bot.createMessage(msg.channel.id, 'You need to specifiy wether to `allow` or `deny` NSFW here');
	else if (suffix === 'check') {
		let settings = settingsManager.getAllNSFW(msg.channel.guild.id);
		bot.createMessage(msg.channel.id, settings === null ? 'There are no NSFW channels on this server.' : `**NSFW Channels:**\n<#${settings.join('>\n<#')}>`);
	} else {
		settingsManager.setNSFW(msg.channel.guild.id, msg.channel.id, suffix)
			.then(m => { bot.createMessage(msg.channel.id, m) })
			.catch(e => { bot.createMessage(msg.channel.id, e) });
	}
}
module.exports = {
	desc: "Adjust a server's settings.",
	help: `Modify how the bot works on a server.
	__welcome__: Set the channel and message to be displayed to new members \`welcome #general Welcome \${USER} to \${SERVER}\`.
	__events__: Modify event subscriptions \`events #event-log +memberjoined +userbanned -namechanged\`.
	__nsfw__: Allow NSFW commands to be used in the channel \`nsfw allow\` \`nsfw deny\`.`,
	usage: "Usage at https://github.com/SloppierKitty7/megu-bot/wiki/Settings",
	aliases: ['set', 'config'],
	cooldown: 3,
	requiredPermission: "manageGuild",
	guildOnly: true,
	task(bot, msg, suffix, config, settingsManager) {
		if (suffix) {
			if (suffix.startsWith('welcome'))
				updateWelcome(bot, msg, suffix.substr(7).trim(), settingsManager);
			else if (suffix.startsWith('events'))
				handleEventsChange(bot, msg, suffix.substr(6).trim(), settingsManager);
			else if (suffix.toLowerCase().startsWith('nsfw'))
				updateNSFWSetting(bot, msg, suffix.substr(5).trim().toLowerCase(), settingsManager);
			else if (suffix.startsWith('ignore'))
				addIgnores(bot, msg, suffix.substr(7).trim().toLowerCase(), settingsManager);
			else if (suffix.startsWith('unignore'))
				removeIgnores(bot, msg, suffix.substr(9).trim().toLowerCase(), settingsManager);
			else
				return 'wrong usage';
		} else
			return 'wrong usage';
	}
};
