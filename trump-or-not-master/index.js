sqlite3 = require("sqlite3");
express = require("express");
const db = new sqlite3.Database("app.db");
const server = express();

var getRandomTweet = function (callback) {
	var rand = tweetIds[Math.floor(Math.random() * tweetIds.length)];
	db.all("SELECT * FROM tweets WHERE id=$id", {$id: rand}, function (err, res) { callback(JSON.stringify(res[0])); });
}
var init = function () {
	server.get("/random", function (req, res) {
		var id = req.params[0];
		getRandomTweet(res.end.bind(res));
	});
	server.listen(8080);
}
db.all("SELECT id FROM tweets", function (err, res) {
	tweetIds = [];
	for (var ii = 0; ii < res.length; ii++) {
		tweetIds.push(res[ii].id);
	}
	init();
});
