
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
			r.db('megu').table('pickup').insert([
			{
			  message:[
				{Approved: true, Line: suffix, by: msg.member.user.username	}
			  ]
			}
			]).run(connection, function(err, result) {
			if (err) throw err;
			var log_id = "258216306136842240"
				bot.createMessage(msg.channel.id, "Feedback has been submitted" || 'feedback');
				//bot.createMessage(log_id, "Feedback by ***" + msg.member.user.username + '***  in **' + msg.guild.name + '**' + "```" + suffix + '```'|| 'feedback');
			})
			}
		}
};




//{Approved: true, Line: suffix, by: msg.member.user.username	}