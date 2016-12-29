var reload = require('require-reload'),
	formatTime = reload('../../utils/utils.js').formatTime,
	version = reload('../../package.json').version,
	Nf = new Intl.NumberFormat('en-US');


module.exports = {
	desc: "stats for the bot",
	usage: "",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {
		let totalCommandUsage = commandsProcessed + cleverbotTimesUsed;		
        let embed = {
            color: 9083663,
            author: {
                name: 'Megu-bot Statistics'
            },
            fields: [
                {
                    name: `Uptime`,
                    value: `${formatTime(bot.uptime)}`,
					inline: true
                },{
					name: `Memory Usage`,
                    value: `${Math.round(process.memoryUsage().rss / 1024 / 1000)}MB`,
					inline: true
				},{
					name: `Version`,
                    value: `megu-bot ${version}`,
					inline: true
				},{
					name: `Shards`,
                    value: `${bot.shards.size}`,
					inline: true
				},{
					name: `Available to...`,
                    value: `${Nf.format(bot.guilds.size)} Guilds\n`
					+ `${Nf.format(Object.keys(bot.channelGuildMap).length)} Channels\n`
					+ `${Nf.format(bot.privateChannels.size)} Private Channels\n`
					+ `${Nf.format(bot.users.size)} Users\n`
					+ `(${Nf.format((bot.users.size / bot.guilds.size).toFixed(2))} Average Users/Guild)`,
					inline: true
				},{
					name: `Command Usage`,
                    value: `${Nf.format(commandsProcessed)} Commands\n`
					+ `${Nf.format(cleverbotTimesUsed)} Cleverbot\n`
					+ `${Nf.format(totalCommandUsage)} Total\n`
					+ `${Nf.format(bot.users.size)} Users\n`
					+ `${(totalCommandUsage / (bot.uptime / (1000 * 60))).toFixed(2)}/min Average`,
					inline: true
				}
            ]
        }
			bot.createMessage(msg.channel.id,{embed: embed});	
    }
};