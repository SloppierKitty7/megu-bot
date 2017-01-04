var reload = require('require-reload'),
	config = reload('../../config.json');


var SteamApi = require('steam-api');
var request = require('request');
var optionalSteamId = "STEAM_0:0:40356689"
var user = new SteamApi.User(config.steam, optionalSteamId);

module.exports = {
	desc: "urbandictionary word search",
	usage: "(word)",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {
		
		let flags = suffix.split(" ");
		if (flags[0] === 'user'){
			user.ResolveVanityUrl(flags[1]).done(function(result){
				request("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key="+ config.steam + "&steamids=" + result, function(err, response, body) {
					var s_ = JSON.parse(body);
					var s__ = s_.response.players[0];
					if( typeof s__ === 'undefined' || s__ === null ){
						bot.createMessage(msg.channel.id, 'not found');
					} else{
						request("https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key="+ config.steam + "&format=json&steamid=" + result, function(err, response, body) {
							var l_ = JSON.parse(body);
							let embed = {
								color: 12391760,
								author: {
									name: s__.personaname,
									icon_url: s__.avatar
								},
								thumbnail: {
									url: s__.avatarfull
								},
								fields: [{
										name: `Name`,
										value: `${s__.personaname}`,
										
									},{
										name: `ID`,
										value: `${s__.primaryclanid}`
										
									},{
										name: `Real Name`,
										value: `${s__.realname}`
										
									},{
										name: `Country`,
										value: `${s__.loccountrycode}`
										
									},{
										name: `Level`,
										value: `${l_.response.player_level}`
										
									},{
										name: `Created`,
										value: `${new Date(s__.timecreated)}`
									},{
										name: `Last Logoff`,
										value: `${new Date(s__.lastlogoff)}`
									}
								]
							}
							bot.createMessage(msg.channel.id,{embed: embed});	
						});
					}
				});
				
			});
		} else if (flags[0] === 'help'){ 
			bot.createMessage(msg.channel.id, "This is **SloppierKitty7's** recreation of steam bot inside of **megu-bot** \n ``` !steam game [name] - Gets info for a game on steam \n !steam user [name] - gets info for a user on steam \n !steam avatar [name] - gets a user's avatar \n !steam library [name] - search for a users library \n !steam wishlist [name] - search for the games in a users wishlist which are on sale \n !steam random [user] - select a random game from a users library \n !steam top - get a list of the top selling games ```");
		} else if (flags[0] === 'game'){ 
			bot.createMessage(msg.channel.id, "Not added yet");
		} else if (flags[0] === 'library'){ 
			bot.createMessage(msg.channel.id, "Not added yet");
		} else if (flags[0] === 'wishlist'){ 
			bot.createMessage(msg.channel.id, "Not added yet");
		} else if (flags[0] === 'random'){ 
			bot.createMessage(msg.channel.id, "Not added yet");
		} else if (flags[0] === 'top'){ 
			bot.createMessage(msg.channel.id, "Not added yet");
		}else if (flags[0] === 'avatar'){ 
			user.ResolveVanityUrl(flags[1]).done(function(result){
				request("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key="+ config.steam + "&steamids=" + result, function(err, response, body) {
					var a_ = JSON.parse(body);
					var a__ = a_.response.players[0];
					bot.createMessage(msg.channel.id, a__.avatarfull);
				});
			});
		}else{
			bot.createMessage(msg.channel.id, 'do !steam help for info');
		}
	}
};

