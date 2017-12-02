var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("app.db");
var data = require("./trump1.js").data;
console.log(data.length);
const name = process.argv[2];

for (var ii = 0; ii < data.length; ii++) {
	db.run("INSERT INTO tweets VALUES ($id, $timestamp, $content, $isTrump, 0, 0)", {
		$id: ii + 12,
		$timestamp: data[ii].timestamp,
		$content: data[ii].text,
		$isTrump: "TRUE"
	});
}
