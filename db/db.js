const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'postgres://dzonib:123456@localhost:5432/file_upload'
)

module.exports = sequelize
