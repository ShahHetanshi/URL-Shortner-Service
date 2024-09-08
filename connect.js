const mysql = require('mysql2/promise');

async function connectToMySQL() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'hetanshi',
            database: 'mysql'
        });
        console.log('MySQL connected');
        return connection;
    } catch (error) {
        console.error('MySQL connection error:', error);
        throw error;
    }
}

module.exports = connectToMySQL;
