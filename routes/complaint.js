const express       = require("express")
const bcrypt        = require("bcryptjs")
const jwt           = require("jsonwebtoken")
const router        = express.Router()
const model         = require('../models/index')
const multer        = require('multer')
const bodyParser    = require('body-parser')
const fs            = require('fs')

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

router.get('/on-going', async function(req, res, next) {

    try {
     
        const user           =   req.decoded

        const complaint     =   await model.Complaint.findAll({
            where:{
                user_id: user.id,
                status: null,
            },
            include: 'categories',
            order: [['id','DESC']],
        })
    
        return res.status(200).json({
            mssg: 'on going complaint',
            data: complaint
        })

    } catch (err) {
        
        return res.status(500).json({
            err: err.message
        })

    }

})

router.post('/create', upload.single('foto', 3), async (req, res) => {

    const   complaint               =   model.Complaint
    
    try {

        const   { 
            description,
            user_id,
            isAnonym,
            category_id,
            latitude,
            longitude
        }          =   req.body
        const   foto           =   req.file.filename

        if (!req.file) {
            return res.status(402).json({
                status: 'err',
                mssg: 'no file received'
            })
        }
    
        if (description == "") {
            return res.status(402).json({
                status: 'err',
                mssg: 'invalid input',
                title: title
            })
        }

        const data    =   await complaint.create({
            description,
            foto,
            user_id,
            isAnonym,
            category_id,
            latitude,
            longitude
        })

        return res.status(201).json({
            mssg: 'success created data',
            data: data
        })

    } catch (err) {

        console.info(err)
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


router.delete('/:id/delete', async function(req, res, next) {

    try {

        const   complaint    =   await model.Complaint.findOne({
            where: {
                id: req.params.id
            }
        })

        fs.unlink(`./public/images/${complaint.foto}`, (err) => {

            if (err) {
             
                res.status(403).json({
                    mssg: 'failed to unlink file',
                    error: err.message
                })

            }

        })

        complaint.destroy({})

        if (complaint) {
            return res.status(202).json({
                mssg: 'success deleted data',
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