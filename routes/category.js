const express   =   require('express')
const app       =   express()
const router    =   express.Router()
const model     =   require('../models/index')

router.get('/category', function (req, res, next) {
    return res.status(200).json({
        mssg: 'category routes'
    })
})

router.post('/category/create', async function(req, res, next) {
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

router.post(`/category/:id/edit`, async function(req, res, next) {
    const category     =    model.Category

    const data          =   category.findId({id:id})



})