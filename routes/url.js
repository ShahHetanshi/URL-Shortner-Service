const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

async function connectToMySQL() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'hetanshi',
        database: 'mysql'
    });
}

router.get('/:shortID', async (req, res) => {
    try {
        const { shortID } = req.params;
        const connection = await connectToMySQL();
        const [rows] = await connection.execute('SELECT redirectURL FROM urls WHERE shortID = ?', [shortID]);
        await connection.end();

        if (rows.length > 0) {
            res.redirect(rows[0].redirectURL);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred', details: err.message });
    }
});

module.exports = router;
