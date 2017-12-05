sqlite3 = require("sqlite3");
express = require("express");
const db = new sqlite3.Database("app.db");
const server = express();

var getRandomTweet = function (callback) {
	var rand = tweetIds[Math.floor(Math.random() * tweetIds.length)];
	db.get("SELECT content, id, timestamp FROM tweets WHERE id=$id", {$id: rand}, function (err, res) { callback(JSON.stringify(res)); });
}
var getTweetStatus = function (id, callback) {
	db.get("SELECT isTrump, wrong, correct FROM tweets WHERE id=$id", {$id: id}, function (err, res) { callback(JSON.stringify(res)); });
}
var init = function () {
	server.get("/status/:id", function (req, res) {
		var id = req.params.id;
		getTweetStatus(id, res.end.bind(res));
	});
	server.get("/random", function (req, res) {
		getRandomTweet(res.end.bind(res));
	});
	server.use(express.static("./static"));
	server.listen(8080);
}
db.all("SELECT id FROM tweets", function (err, res) {
	tweetIds = [];
	for (var ii = 0; ii < res.length; ii++) {
		tweetIds.push(res[ii].id);
	}
	init();
});
