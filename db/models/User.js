const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: {
        type: Sequelize.BLOB("long")
    }
})

module.exports = User
