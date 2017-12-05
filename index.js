sqlite3 = require("sqlite3");
express = require("express");
const db = new sqlite3.Database("app.db");
const server = express();

var getRandomTweet = function (callback) {
	var rand = tweetIds[Math.floor(Math.random() * tweetIds.length)];
	db.get("SELECT content, id, timestamp FROM tweets WHERE id=$id", {$id: rand}, function (err, res) { callback(res); });
}
var tallyVote = function (id, vote, callback) {
	if (vote === "TRUE") db.run("UPDATE tweets SET correct = correct + 1 WHERE id=$id", {$id: id});
	else db.run("UPDATE tweets SET wrong = wrong + 1 WHERE id=$id", {$id: id});
	db.get("SELECT isTrump, wrong, correct FROM tweets WHERE id=$id", {$id: id}, function (err, res) { callback(res); });
}
var init = function () {
	server.get("/vote/:id/:vote", function (req, res) {
		var id = req.params.id;
		var vote = req.params.vote;
		tallyVote(id, vote, res.json.bind(res));
	});
	server.get("/random", function (req, res) {
		getRandomTweet(res.json.bind(res));
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
