const   jwt     =   require('jsonwebtoken')


    async function auth(req, res, next) {

        try 
        {

          const token     = await req.headers['authorization']
          const bearer = token.split(' ')
          const bearerToken = bearer[1]
          req.token = bearerToken
          const resp  = await jwt.decode(bearerToken, 'randomString')

          if (!resp) {

            return res.status(401).json({
              mssg: 'Invalid token'
            })

          }
            console.info(resp)
            // const result    = await jwt.verify(bearerToken, 'randomString')
            // console.info('result : '+ result)
            return next()
          // } 
            Forbidden
            res.sendStatus(403)
          } catch (err) {
          res.json({
            status: 'error',
            mssg: 'server error'
          })
        }
        // console.info('token :' + token)

    

    }


  module.exports    =   auth