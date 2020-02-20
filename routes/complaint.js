const express       = require("express")
const bcrypt        = require("bcryptjs")
const jwt           = require("jsonwebtoken")
const router        = express.Router()
const model         = require('../models/index')
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

    const   complaint               =   model.Complaint

    try {

        const   { title, 
            description, 
                address  }          =   req.body
        const   thumbnail           =   req.file.filename
        const   token               =   jwt.verify

        if (!req.file) {
            return res.status(402).json({
                status: 'err',
                mssg: 'no file received'
            })
        }
    
        if (!title || !description || !address) {
            return res.status(402).json({
                status: 'err',
                mssg: 'invalid input'
            })
        }

        const data    =   await complaint.create({
            title,
            description,
            thumbnail,
            user_id,
            category_id
        })

        return res.status(202).json({
            mssg: 'success created data',
            data: data
        })

    } catch (err) {
        return res.status(500).json({
            mssg: err.message
        })
    }
    // console.info('name '+ req.file.filename )
    // res.status(200).json({
    //     message: 'success!',
    //   })
})


module.exports  =   router