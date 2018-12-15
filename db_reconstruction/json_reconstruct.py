import json
import sqlite3

# CREATE TABLE tweets (id INTEGER PRIMARY KEY, timestamp TEXT, content TEXT, isTrump TEXT, correct INTEGER, wrong INTEGER);

obj = json.load(open('dump.json', 'r'));

conn = sqlite3.connect('app.db')
curs = conn.cursor()
for tweet in obj['tweets']:
	curs.execute('''
		INSERT INTO tweets (
			timestamp,
			content,
			isTrump,
			correct,
			wrong
		) VALUES (?,?,?,?,?)
	''', (
		tweet['timestamp'],
		tweet['content'],
		tweet['isTrump'],
		tweet['correct'],
		tweet['wrong']
	))


conn.commit()

