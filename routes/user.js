const express = require('express')
const multer = require('multer')

const router = express.Router()
const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000 * 1000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
            cb(new Error("File must be a .jpg or .jpeg"))
        }

        cb(undefined, true)
    }
})

router.post('/avatar', upload.single('avatar'), (req, res) => {
    res.send()
})

module.exports = router
