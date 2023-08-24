const express = require('express');

const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path');

const fetch = require('node-fetch');



app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('database.db');

db.run(`
  CREATE TABLE IF NOT EXISTS tickers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    last REAL,
    buy REAL,
    sell REAL,
    volume REAL,
    base_unit TEXT
  )
`);

app.get('/api/tickers', (req, res) => {
    db.all('SELECT * FROM tickers LIMIT 10', (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json({ tickers: rows });
        }
    });
});

app.listen(3003, () => {
    console.log('Server is running on port 3003');
});
