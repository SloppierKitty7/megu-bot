module.exports = {
	desc: "Get information about a user",
	usage: "<@user>",
	hidden: false,
	guildOnly: true,
	ownerOnly: false,
	task(bot, msg, suffix) {
			let use_m = msg.guild.members.get(msg.guild.ownerID);	
			var r = msg.guild.roles.map(c => c.name).join(', ')
			var t_ = msg.guild.channels.filter(c => c.type === 0).map(c => c.name).join(', ')
			var v_ = msg.guild.channels.filter(c => c.type === 2).map(c => c.name).join(', ')
			var e__ = msg.guild.emojis.map(c => c.name + ":" + c.id).join('> <:')

			if (msg.guild.defaultNotifications == 0){
				n_ = "All messages";
			} else if (msg.guild.defaultNotifications == 1){
				n_ = "Only @mentions";
			}

			if (msg.guild.large == true){
				l_ = "Not considered large by Discord's standards";
			} else if (msg.guild.large== false){
				l_ = "Not considered large by Discord's standards ";
			}


			let embed = {
			color: 12391760,
            author: {
                name: msg.guild.name,
                icon_url: msg.guild.iconURL
            },
            thumbnail: {
                url: msg.guild.iconURL
            },
            fields: [
                {
                    name: `ID`,
                    value: `${msg.guild.id}`,
					inline: true
                },{
					name: `Region`,
                    value: `${msg.guild.region}`,
					inline: true
				},{
                    name: `Members`,
                    value: `${msg.guild.memberCount}`,
					inline: true
                },{
					name: `Owner`,
                    value: `${use_m.user.username + '#' + use_m.user.discriminator}`,
					inline: true
				},{
					name: `Text channels`,
                    value: `${(t_.split(",").length)}`,
                    inline: true
				},{
					name: `Voice channels`,
                    value: `${v_.split(",").length}`,
                    inline: true
				},{
					name: `Default notifications`,
                    value: `${n_}`,
                    inline: true
				},{
					name: `afk Timeout`,
                    value: `${msg.guild.afkTimeout / 60 + "mins "}`,
                    inline: true
				},{
					name: `Large`,
                    value: `${l_}`
				},{
					name: `Created at`,
                    value: `${new Date(msg.guild.createdAt)}`
				},{
					name: `Roles`,
                    value: `${r}`
				},{
					name: `Emojis`,
                    value: `${'<:' + e__ + '>'}`
				}
            ]
        }
        	//console.log (JSON.stringify(msg.guild.emojis));
			bot.createMessage(msg.channel.id,{embed: embed});			
	}
};