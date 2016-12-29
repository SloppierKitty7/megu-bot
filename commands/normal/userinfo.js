module.exports = {
	desc: "Get information about a user",
	usage: "<@user>",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {	
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
			// roles
			var r = msg.member.roles.map(r=>msg.guild.roles.get(r).name).join(', ')
			let embed = {
			color: 12391760,
            author: {
                name: msg.member.user.username,
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
					name: `Roles`,
                    value: `${r}`
				}
            ]
        }
			
			//bot.createMessage(msg.channel.id, 'ID for '+ msg.member.user.username +' is `' + msg.member.user.id + '`');	
			bot.createMessage(msg.channel.id,{embed: embed});				
	}
};