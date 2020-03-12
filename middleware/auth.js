// this middleware can used by all role
const   jwt     =   require('jsonwebtoken')
require('dotenv/config');

  async function auth(req, res, next) {

    try 
    {

      const token    = await req.headers['authorization']
      const key      = process.env.JWTKEY
        
      const verify   = await jwt.verify(`${token}`, key, (err, decoded) => {

        if (err) {
          
          return res.status(401).json({
            mssg: err.message
          })

        }

        req.decoded = decoded
        return next()

      })

    } catch (err) {

        return res.json({
          status: 'error',
          mssg: err.message
        })

    }

  }


  module.exports    =   auth