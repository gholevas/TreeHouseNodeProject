var https = require('https');
var http = require('http');

function printMessage(userName, badgeCount, points){
	var message = userName + ' has ' + badgeCount + ' total badge(s) and '+ points + ' points in JavaScript.';
	console.log(message);
}

function printError(e){
	console.log("Got error: " + e.message);
}

function get(userName){
	var request = https.get('https://teamtreehouse.com/'+userName+'.json', function(res) {
	  var body = '';
	  	res.on('data',function(chunk){
			body += chunk;
		});
		res.on('end',function(){
			if(res.statusCode === 200){
				try{
					var profile = JSON.parse(body);
					printMessage(userName,profile.badges.length,profile.points.JavaScript);
				} catch(e){
					printError(e);
				}
			}else{
				printError({message: "There was an error getting the profile for "+ userName+ '. ('+ http.STATUS_CODES[res.statusCode] + ')'});
			}
		})
	});
	request.on('error', printError);
}

module.exports.get = get;