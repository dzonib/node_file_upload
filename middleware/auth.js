const jwt = require('jsonwebtoken')
const User = require('../db/models/User')

const auth = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            return res.json("Need authoraziration")
        }
        const token = req.header("Authorization").replace('Bearer ', '')
        if (!token) {
            res.json("Not authenticated")
        }
        const decoded = await jwt.verify(token, 'secret')

        const user = await User.findByPk(decoded.id)
    
        if (!user) {
            return res.json("Not authenticated")
        }

        req.user = user
        next()
    } catch(e) {
        console.log(e.message)
    }
}


module.exports = auth