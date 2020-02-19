const express       = require("express")
const bcrypt        = require("bcryptjs")
const jwt           = require("jsonwebtoken")
const router        = express.Router()
const model         =   require('../models/index')
const multer        = require('multer')
const bodyParser    = require('body-parser')


const Storage   =   multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/images/')
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
})

const upload    =   multer({storage: Storage})

router.get('/', function(req, res, next) {
    res.json({
        status: 'ok'
    })
})

router.post('/create', upload.single('photo', 3), async (req, res) => {
    // console.info('title : '+ req.file.filename)
    if (!req.file) {
        console.info('not img received')
    }

    const   { title, description,  } = req.body

    try {
        
    } catch (err) {
        
    }
    // console.info('name '+ req.file.filename )
    // res.status(200).json({
    //     message: 'success!',
    //   })
})


module.exports  =   router