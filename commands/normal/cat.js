var request = require('request');

module.exports = {
	desc: "http://random.cat/",
	usage: "",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {
		request("http://random.cat/meow", function(err, response, body) {
		var cat = JSON.parse(body);
		bot.createMessage(msg.channel.id, cat.file);
		});
	}
};

