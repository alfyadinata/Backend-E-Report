const express   = require("express")
const router    = express.Router()
const model     = require('../models/index')

async function visitor({req, res, next}) {

    await   model.Visitor.create({
        
    })

}

module.exports  =   visitor