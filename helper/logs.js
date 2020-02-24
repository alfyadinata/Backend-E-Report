const express   = require("express")
const router    = express.Router()
const model     = require('../models/index')

async function logs(message, ip) {

    try {

        return await model.Log.create({
            ip: ip,
            latitude:'',
            longitude:'',
            user_id: 1,
            message: message
        })

        console.log(ip)

    } catch (err) {
        
        console.info('mssg: '+err.message)

    }

}

module.exports  =    logs