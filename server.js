const express = require('express')
const multer = require('multer')

const app = express()

app.use(express.json())
const port = process.env.PORT || 5000

// get istance of multer and provide configuration
const upload = multer({
    // pick destenation where files will be stored
    dest: 'images',
    limits: {
        fileSize: 1000 * 1000
    },
    fileFilter(req, file, cb) {
        // name is on file object
        // code runs only when file is not pdf format

        // if (!file.originalname.endsWith('.pdf')) {
            // if something goes wrong we call callback(cb) with error
        //     return cb(new Error('File must be a PDF'))
        // }

        // you can use if statement or regular expresions
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('File must be a .doc or docx'))
        }

        // if all goes well we callback with undefined and bool
        // if its true we expect upload
        // if its false upload will be rejected
        cb(undefined, true)
    }
})

// use upload middleware which takes single argument (name of upload)
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.use('/api/users', require('./routes/user'))

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})
