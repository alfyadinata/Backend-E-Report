const express = require("express")
const { check, validationResult} = require("express-validator/check")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

const Model       =  require('../models/index')

/* GET users listing. */
router.get('/', async function(req, res, next) {

  let   data  = await Model.User.findAll({})

  res.json({
    status: 'ok',
    // profile: req.,
    msg: 'success loaded',
    data: data

  })

})

router.get('/json', function(req,res, next) {
  res.send('json page')
})

router.post("/signup",[check("name", "Please Enter a Valid name").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
  ],
  async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
          return res.status(400).json({
              errors: errors.array()
          })
      }


      const { name, email, password } = req.body

      try {
          let user = await Model.User.findOne({
              email
          })

          
          const salt = await bcrypt.genSalt(10)

          req.body.password = await bcrypt.hash(password, salt)

          if (user) {
              return res.status(400).json({
                  msg: "User Already Exists"
              })
          }

          user = await Model.User.create({
              name,
              email,
              password
          })

          return res.json({
            msg: 'success created account',
            data: user
          })

      } catch (err) {
          console.log(err.message)
          res.status(500).send("Error in Saving")
      }
  }
)


module.exports = router
