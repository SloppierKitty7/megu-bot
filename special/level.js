var reload      = require('require-reload')(require),
	r 			= require('rethinkdb'),
	entities    = require('entities'),
	logger      = new (reload('../utils/Logger.js'))((reload('../config.json')).logTimestamp, 'yellow'),
	antiSpam    = {};


var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})
	
module.exports = function(bot, msg, config, settingsManager) {
		r.db('megu').table('user').filter({user_id: msg.member.id}).run(connection, function(err, cursor) {
		if (err) throw err;
				cursor.toArray(function(err, result) {
            if (err) throw err;
				var ran = JSON.stringify(result);
				obj = JSON.parse(ran);
				if (obj.length == 0){
				bot.createMessage('258398540550635530', "Shit has not been counted!");
					r.db('megu').table('user').insert({
						user_id: msg.member.id, 
						Level: 0,
						Xp: 0, 
						rep: 0
					}
					).run(connection, function(err, result) {if (err) throw err;})
				} else {
					//console.log(result[0].Xp)
					r.db('megu').table('user').filter({user_id: msg.member.id}).update({"Xp": result[0].Xp + 1 }).run(connection, function(err, cursor) {})
				}
			})
		})
}
