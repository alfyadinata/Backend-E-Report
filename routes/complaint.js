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
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload    =   multer({storage: Storage})

router.get('/', async function(req, res, next) {

    const complaint     =       await model.Complaint.findAll({})
    return res.status(200).json({
        data: complaint
    })
    
})

router.post('/create', upload.single('foto', 3), async (req, res) => {

    const   complaint               =   model.Complaint
    
    try {

        const   { 
            title,
            description,
            address,
            user_id,
            category_id
        }          =   req.body
        const   foto           =   req.file.filename

        if (!req.file) {
            return res.status(402).json({
                status: 'err',
                mssg: 'no file received'
            })
        }
    
        if (title == "" || description == "" || address == "") {
            return res.status(402).json({
                status: 'err',
                mssg: 'invalid input',
                title: title
            })
        }

        const data    =   await complaint.create({
            title,
            description,
            foto,
            user_id,
            category_id
        })

        return res.status(201).json({
            mssg: 'success created data',
            data: data
        })

    } catch (err) {

        return res.status(500).json({
            mssg: err.message
        })

    }
})

router.patch('/:id/edit', async function(req, res, next) {

    try {
        const   id      =   req.params.id
        const { 
            title,
            description, 
            category_id,
            isAnonym,  
        }               =   req.body

        const complaint =   await model.Complaint.update({
            title, description, isAnonym, category_id
        },{
            where: {
                id: id
            }
        })

        if (complaint) {
            
            return res.status(201).json({
                mssg: 'success created data',
                data: complaint
            })

        }

    } catch (err) {

        return res.status(500).json({
            mssg: err.message
        })

    }

})


module.exports  =   router