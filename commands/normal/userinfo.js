module.exports = {
	desc: "Get information about a user",
	usage: "<@user>",
	hidden: false,
	guildOnly: true,
	ownerOnly: false,
	task(bot, msg, suffix) {	
	if (msg.mentions == "") {
			//nickname
			if (msg.member.nick == null){
				var nick_name = 'n/a'
			}else{
				var nick_name = msg.member.nick
			}
			//game
			if (msg.member.game == null){
				var playing_ = 'n/a'
			}else{
				var playing_ = msg.member.game.name
			}
			//time
			var time = new Date(msg.member.joinedAt);
			var time_c = new Date(msg.member.user.createdAt);
			// roles
			var r = msg.member.roles.map(r=>msg.guild.roles.get(r).name).join(', ')
			let embed = {
			color: 12391760,
            author: {
                name: msg.member.user.username + '#' + msg.member.user.discriminator,
                icon_url: msg.member.user.avatarURL
            },
            thumbnail: {
                url: msg.member.user.avatarURL
            },
            fields: [
                {
                    name: `ID`,
                    value: `${msg.member.user.id}`,
					inline: true
                },{
					name: `Nickname`,
                    value: `${nick_name}`,
					inline: true
				},{
                    name: `Status`,
                    value: `${msg.member.status}`,
					inline: true
                },{
					name: `Playing`,
                    value: `${playing_}`,
					inline: true
				},{
					name: `Joined`,
                    value: `${time}`
				},{
					name: `Created at`,
                    value: `${time_c}`
				},{
					name: `Roles`,
                    value: `${r}`
				}
            ]
        }
			
			//bot.createMessage(msg.channel.id, 'ID for '+ msg.member.user.username +' is `' + msg.member.user.id + '`');	
			bot.createMessage(msg.channel.id,{embed: embed});				
	} else{
			let use_m = msg.guild.members.get(msg.mentions[0].id);
			
			//nickname
			if (use_m.nick == null){
				var nick_name = 'n/a'
			}else{
				var nick_name = use_m.nick
			}
			//game
			if (use_m.game == null){
				var playing_ = 'n/a'
			}else{
				var playing_ = use_m.game.name
			}
			//time
			var time = new Date(use_m.joinedAt);
			// roles
			var r = use_m.roles.map(r=>msg.guild.roles.get(r).name).join(', ')
			let embed = {
			color: 12391760,
            author: {
                name: use_m.user.username + '#' + use_m.user.discriminator,
                icon_url: use_m.user.avatarURL
            },
            thumbnail: {
                url: use_m.user.avatarURL
            },
            fields: [
                {
                    name: `ID`,
                    value: `${use_m.user.id}`,
					inline: true
                },{
					name: `Nickname`,
                    value: `${nick_name}`,
					inline: true
				},{
                    name: `Status`,
                    value: `${use_m.status}`,
					inline: true
                },{
					name: `Playing`,
                    value: `${playing_}`,
					inline: true
				},{
					name: `Joined`,
                    value: `${time}`
				},{
					name: `Roles`,
                    value: `${r}`
				}
            ]
        }
			
			//bot.createMessage(msg.channel.id, 'ID for '+ msg.member.user.username +' is `' + msg.member.user.id + '`');	
			bot.createMessage(msg.channel.id,{embed: embed});	
		}
	}
};