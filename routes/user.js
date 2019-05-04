const express = require('express')
const multer = require('multer')
const jwt = require('jsonwebtoken')

const auth = require("../middleware/auth")
const User = require('../db/models/User')

const router = express.Router()

router.post('/register', async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.create({ email, password })

    res.json(user)
})

router.post('/login', async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
        return res.json('USER NOT FOUND')
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'secret', {
        expiresIn: '10h'
    })

    res.json(`Bearer ${token}`)
})

router.get("/protected", auth ,(req, res, next) => {
    console.log(JSON.stringify(req.user, undefined, 4))
    res.json("yo")
})

const upload = multer({
    // if you remove dest property  you will get access on req.file and can save it to db
    // dest: 'avatars',
    limits: {
        fileSize: 1000 * 1000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
            return cb(new Error('File must be a .jpg or .jpeg'))
        }

        cb(undefined, true)
    }
})

// UPLOAD AVATAR
router.post(
    '/avatar',
    auth,
    upload.single('avatar'),
    async (req, res) => {

        await req.user.update({avatar: req.file.buffer})
        res.send()
    },
    (err, req, res, next) => {
        res.status(400).send({ error: err.message })
    }
)

// DELETE AVATAR
router.delete("/avatar", auth, async (req, res, next) => {
    await req.user.update({avatar: null})
    res.send()
})

module.exports = router
