var request = require('request');
module.exports = {
    desc: "nsfw",
    usage: "<text>",
    hidden: false,
    ownerOnly: false,
    task(bot, msg, suffix, config, settingsManager) {    
		var nsfw = settingsManager.getNSFW(msg.guild.id, msg.channel.id);
		//console.log(nsfw);
		if(!nsfw){
			bot.createMessage(msg.channel.id, 'you can only use this command in a **nsfw** channel');	
		} 
		else {
			//bot.createMessage(msg.channel.id, 'dick');	
			    request("http://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1&pid=0&tags=" + suffix, function(err, response, body) {
                    var countRegex = /count="(\d*)"/m;
                    var matchCount = countRegex.exec(body);
                    if (matchCount != null && parseInt(matchCount[1]) != null) {
                        var count = parseInt(matchCount[1]);
                        if (count <= 0) {
                            bot.createMessage(msg.channel.id, 'sorry mate i found zero dicks for you to fap too :(');	
                            return;
                        }
                        var page = Math.floor((Math.random() * count) + 1);
                        request("http://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1&pid=" + page + "&tags=" + suffix, function(err, response, body) {
                            var urlRegex = /file_url="\/\/(.+?)"/m
                            var matchUrl = urlRegex.exec(body);
                            if (matchUrl != null) {
                                bot.createMessage(msg.channel.id, "http://" + matchUrl[1]);
                            }
                        })
                    }
                });

		}
    }
};
 