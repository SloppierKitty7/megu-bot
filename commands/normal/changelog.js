module.exports = {
	desc: "Get information about the channel",
	usage: "",
	hidden: false,
	guildOnly: true,
	ownerOnly: false,
	task(bot, msg, suffix, channel) {
			let c_ = bot.getChannel('253351278661468171')
			
			c_.getMessages(0).then(function(value) {

			
			let embed = {
			color: 12391760,
            author: {
                name: 'Changelog',
                icon_url: 'https://cdn.discordapp.com/avatars/213739426327691264/9ff7b61cd2b95a0ef530292385fece71.jpg'
            },
            fields: [{
					name: `.`,
                    value: `${value[0].content}`
				}
            ]
        }
			bot.createMessage(msg.channel.id,{embed: embed});
	})
	}
};