
var reload = require('require-reload'),
	config = reload('../../config.json');

var osu = require('nodesu');

module.exports = {
	desc: "Display Taiko stats for a user",
	usage: "<text>",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {
		var osuApi = new osu.api({
		  apiKey: config.osuapi
		});

				osuApi.getUser(osuApi.user.byUsername(suffix), osuApi.mode.taiko, function(err, response) {
				  if (err) {
					return console.log (err);
				  }
				  bot.createMessage(msg.channel.id, "User stats for: " + suffix + "\n" +"```" + "Mode: osu!taiko" + "\n" + "id: " + response.user_id + "\nRank: #" + response.pp_rank + "\nCountry: " + response.country + "\nCountry rank: #" + response.pp_country_rank + "\nPP: " + response.pp_raw + "\nAcc: " + response.accuracy + "\nLevel: " + response.level + "\nPlaycount: " + response.playcount +"\n" + "```" || 'taiko');
				  return ranks();
				});
				function ranks () {
				osuApi.getUser(osuApi.user.byUsername(suffix), osuApi.mode.taiko, function(err, response) {
				  if (err) {
					return console.log (err);
				  }
				  bot.createMessage(msg.channel.id, "Ranks" + "\n" +"```" + "SS: " + response.count_rank_ss + "\nS: " + response.count_rank_s + "\nA: " + response.count_rank_a + "\n" + "```" || 'taiko');
				 return getBest();
				});
				function getBest () {
		  osuApi.getUserBest(osuApi.user.byUsername(suffix), osuApi.mode.taiko, function(err, response) { // PLEASE be mindful that osu.mode.default can be used as .all as it just = null. Default looks better for convenience here as this api call does NOT get all modes, default is standard.
			if (err) {
			  return console.log (err);
			}
			bot.createMessage(msg.channel.id, "Top play" + "\n" + "```" + "Map url: " + "https://osu.ppy.sh/b/" + response[0].beatmap_id + "\nPP gained: " + response[0].pp + "pp" + "\nDate: " + response[0].date + "\nMaxcombo: " + response[0].maxcombo + "\n300: " + response[0].count300 + "\n100: " + response[0].count100 + "\n50: " + response[0].count50 + "\nMiss: " + response[0].countmiss + "\n" + "```" || 'taiko');
		 });
		}	
			}
		}
	}

