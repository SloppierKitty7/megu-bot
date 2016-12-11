const fs = require('fs');
const request = require('request');

module.exports = {
	desc: "Gets a gif from giphy useing you're serach terams",
	usage: "<text>",
	hidden: false,
	ownerOnly: false,
	task(bot, msg, suffix) {
		var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + suffix;
        download( url, 'gif.json', function(){
            var json = JSON.parse(fs.readFileSync('gif.json', 'utf8'));
            console.log (json);
            console.log (json.data.url);
            bot.createMessage(msg.channel.id, json.data.url || 'gif');
        });
	}
};

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};