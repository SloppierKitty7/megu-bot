var request = require('request');

module.exports = {
	desc: "urbandictionary word search",
	usage: "(word)",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {
		request("http://api.urbandictionary.com/v0/define?term=" + suffix, function(err, response, body) {
		var ub = JSON.parse(body);
		var ub_ = ub.list[0];
		if( typeof ub_ === 'undefined' || ub_ === null ){
				bot.createMessage(msg.channel.id, 'not found');
		} else{
			
				let embed = {
					color: 12391760,
					author: {
						name: 'Urban Dictionary',
						icon_url: 'https://pilotmoon.com/popclip/extensions/icon/ud.png'
					},
					fields: [{
							name: `Word`,
							value: `${ub.list[0].word}`,
							inline: true
						},{
							name: `Author`,
							value: `${ub.list[0].author}`,
							inline: true
						},{
							name: `Definition`,
							value: `${ub.list[0].definition}`
						},{
							name: `example`,
							value: `${ub.list[0].example}`
						},{
							name: `Rating`,
							value: `:thumbsup: ${msg.channel.id, ub.list[0].thumbs_up} :thumbsdown: ${msg.channel.id, ub.list[0].thumbs_down}`
						}
					]
			}
			bot.createMessage(msg.channel.id,{embed: embed}); 
			}
		});
	}
};

