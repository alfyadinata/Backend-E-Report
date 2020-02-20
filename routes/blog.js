const express   = require('express')
const port      = 3000
const router    =   express.Router()
const model     =   require('../models/index')

router.get('/', async function(req, res, next) {
    const blog  =   model.Blog.findAll({})

    return res.status(201).json({
        mssg: 'data blog',
        data: blog
    })

})

router.post('/create', async function(req, res, next) {

    const { title, description, category_id }   =   req.body

    if (!title || !description || !category_id) {

        return res.status(401).json({
            mssg: 'invalid input',
        })

    }

    const   blog    =   await model.Blog

    try {
        
        const   data    =   await blog.create({title, description, category_id})

        if (data) {

            return res.status(201).json({
                mssg: 'success created data',
                data: data
            })            

        }

        
    } catch (err) {

        return res.status(500).json({
            mssg: err.message
        })

    }

})


router.patch('/:id/edit', async function(req, res, next) {

    const   id          =   req.params.id

    if (!id) {
        
        return res.status(404).json({
            mssg: 'data not found',
        })

    }

    const {
        title,
        description,
        category_id,
        user_id
    }                   =   req.body

    const   blog        =   model.Blog

    try {
        
        const   data  =   blog.create({title, description, category_id, user_id})

        if (data) {
            
            return res.status(201).json({
                mssg: 'success updated data',
                data: data
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
        const   id      =   req.params.id
        const   blog    =   await model.Blog.destroy({
            where: {
                id: id
            }
        })
        
        if (blog) {
            
            return res.status(202).json({
                mssg: 'success deleted data',
                data: blog
            })
    
        }
        
    } catch (err) {
    
        return res.status(500).json({
            mssg: err.message
        })
    
    }

})