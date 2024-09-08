const mysql = require('mysql2/promise');
const shortid = require('shortid');
const connectToMySQL = require('../connect');


async function generateNewShortUrl(req, res) {
    try {
        const body = req.body;
        if (!body.url) return res.status(400).json({ error: 'URL is required' });
        const shortID = shortid.generate();
        const connection = await connectToMySQL();
        await connection.execute('INSERT INTO urls (shortID, redirectURL, visitedHistory) VALUES (?, ?, ?)', [shortID, body.url, '[]']);
        await connection.end();
        return res.json({ id: shortID });
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred', details: err.message });
    }
}

async function getShortUrlByRedirect(req, res) {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        const connection = await connectToMySQL();
        const [rows] = await connection.execute('SELECT shortID FROM urls WHERE redirectURL = ?', [url]);
        await connection.end();
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Short URL not found for the provided URL' });
        }
        return res.json({ shortID: rows[0].shortID });
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred', details: err.message });
    }
}

module.exports = {
    generateNewShortUrl,
    getShortUrlByRedirect
};
