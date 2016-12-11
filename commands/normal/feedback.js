
var reload = require('require-reload'),
	config = reload('../../config.json');

var r = require('rethinkdb');

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})


module.exports = {
	desc: "Sends feedback",
	usage: "<text>",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {	
		if (suffix == "") {
			bot.createMessage(msg.channel.id, "Feedback has not been submitted" || 'feedback');
		} else{
			r.db('megu').table('feedback').insert([
			{
			  message:[
				{feedback: suffix, date: Date(),guild_name: msg.guild.name, guild_id: msg.guild.id, user_id: msg.member.id	}
			  ]
			}
			]).run(connection, function(err, result) {
			if (err) throw err;
				bot.createMessage(msg.channel.id, "Feedback has been submitted" || 'feedback');
			})
			}
		}
};
