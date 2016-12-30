const libVersion = require('../../node_modules/eris/package.json').version,
	botVersion = require('../../package.json').version;

var reload = require('require-reload'),
	formatTime = reload('../../utils/utils.js').formatTime,
	version = reload('../../package.json').version,
	Nf = new Intl.NumberFormat('en-US');

module.exports = {
	desc: "Get information about a user",
	usage: "<@user>",
	hidden: false,
	guildOnly: true,
	ownerOnly: false,
	task(bot, msg, suffix) {
			let embed = {
			color: 12391760,
            author: {
                name: 'Megu-bot',
                icon_url: 'https://cdn.discordapp.com/avatars/213739426327691264/9ff7b61cd2b95a0ef530292385fece71.jpg'
            },
            fields: [
                {
                    name: `Version`,
                    value: `${botVersion}`,
					inline: true
                },{
					name: `Library`,
                    value: `${ 'Eris ' + libVersion}`,
					inline: true
				},{
                    name: `Author`,
                    value: `@SloppierKitty7#6980`,
					inline: true
                },{
					name: `Website`,
                    value: `http://Megu.Pixelisk.net`,
					inline: true
				},{
					name: `Servers`,
                    value: `${Nf.format(bot.guilds.size)}`,
                    inline: true
				},{
					name: `support server `,
                    value: `https://discord.gg/5PN6dRz`,
                    inline: true
				}
            ]
        }
        	//console.log (JSON.stringify(msg.guild.emojis));
			bot.createMessage(msg.channel.id,{embed: embed});			
	}
};