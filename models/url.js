const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

// Define the URL model schema for MySQL
const URL = sequelize.define('url', {
    shortID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    redirectURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    visitedHistory: {
        type: DataTypes.JSON, // Store visit history as JSON
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = URL;
