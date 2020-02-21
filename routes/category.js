const express   =   require('express')
const router    =   express.Router()
const model     =   require('../models/index')

router.get('/', async function (req, res, next) {

    const limit      =   10

    const category  =   await model.Category.findAll({limit})

    return res.status(200).json({
        mssg: 'data category',
        data: category
    })
})

router.post('/create', async function(req, res, next) {
    const category          =   model.Category
    const { name,icon }     =   req.body

    if (!name) {
        res.status(401).json({
            mssg: 'name is required'
        })
    }

    try {
        const data  =   category.create({
            name,
            icon
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

})

router.patch(`/:id/edit`, async function(req, res, next) {

    const id        =   await req.params.id

    if (!id) {
        return res.status.json({
            mssg: 'data not found'
        })
    }   
        
    try {
        const category  =   await model.Category.update({
            name, icon
        }, {
            where : {
                id: id
            }
        })
    
        if (category) {
            return res.status(201).json({
                mssg: 'success created data',
                data: category       
            })
        }    
        
    } catch (err) {
        
        return res.status(401).json({
            mssg: err.message
        })
        
    }

})


router.delete('/:id/delete', async function(req, res, next) {

    try {
        const   category    =   await model.Category.destroy({
            where: {
                id: req.params.id
            }
        })

        if (category) {
            return res.status(202).json({
                mssg: 'success deleted data',
                data: category
            })
        }

    } catch (err) {
        
        return res.status(500).json({
            mssg: err.message
        })

    }

})