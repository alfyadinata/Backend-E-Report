const express   = require('express')
const router    =   express.Router()
const model     =   require('../models/index')

router.get('/', async function(req, res, next) {

    const logs  =   await model.Log.findAll({
        include: ['users'],
        order: [['id','DESC']]
    })

    return res.status(200).json({
        mssg: 'Data Log Acticities',
        data: logs
    })

})

module.exports  =   router