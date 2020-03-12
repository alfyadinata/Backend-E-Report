const express   =   require('express')
const router    =   express.Router()
const model     =   require('../models/index')
const logs      =   require('../helper/logs')


router.get('/', async function (req, res, next) {

    const category  =   await model.Category.findAll({
        order: [
            ['id','desc']
        ],
        include: ['blogs','complaints'],
    })

    logs('Request data for category',req.ip)

    return res.status(200).json({
        mssg: 'data category',
        ip: 'test :'+ req.ip,
        data: category,
    })

})

router.post('/create', async function(req, res, next) {
    const category          =   model.Category
    const { name,icon, type  }     =   req.body

    if (!name) {
        return res.status(401).json({
            mssg: 'name is required'
        })
    }

    try {
        const data  =   category.create({
            name,
            icon,
            type
        })        

        logs(`Created Category, Name: ${name}`,req.ip)

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

router.patch(`/:id/edit`, async function(req, res, next) {

    try {

        const id                    =   req.params.id
        const {name, icon, type}    =   req.body

        const category  =   await model.Category.update({
            name, icon, type
        }, {
            where : {
                id: id
            }
        })
        
        if (category) {

            logs(`Updated Category, Name: ${name}`,req.ip)

            return res.status(202).json({
                mssg: 'success updated data',
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

            logs(`Deleted Category, Name: ${category.name}`,req.ip)

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

module.exports  =   router