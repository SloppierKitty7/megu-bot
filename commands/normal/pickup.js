
var reload = require('require-reload'),
	config = reload('../../config.json');

var r = require('rethinkdb');

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});


module.exports = {
	desc: "Sends feedback",
	usage: "<@name>",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {	
		r.db('megu').table('pickup').run(connection, function(err, cursor) {
			if (err) throw err;
				cursor.toArray(function(err, result) {
            if (err) throw err;
				//console.log(JSON.stringify(result));
				//console.log(result.line);
				var ran = JSON.stringify(result[Object.keys(result)[Math.floor(Math.random()*Object.keys(result).length)]]);
				obj = JSON.parse(ran);
				if (msg.mentions == "") {
					bot.createMessage(msg.channel.id, "you need to mention someone");
				} else{
					bot.createMessage(msg.channel.id, msg.mentions[0].mention + ' '+ obj.message[0].Line);
				
				}
			});
		});
	}
};