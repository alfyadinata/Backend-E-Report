const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

const model =   require('../models/index')

router.post("/signup", async function(req, res, next){
    try {

            const {name,email,nik,password} =   req.body

            if (!name || !email || !nik || !password) {

                return res.status(403).json({
                    msg: 'invalid input'
                })

            }

            let user = new model.User({
                name,
                email,
                nik,
                password
            })
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save()
            const payload = {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role_id: 3,
                    msg: 'payload'
                }
            }
            jwt.sign(
                payload,
                "randomString", {
                },
                (err, token) => {
                    if (err) throw err
                    res.status(200).json({
                        msg: 'success created account and login',
                        token: token,
                        data: user,
                    })
                }
            )

    } catch (err) {
            
            res.status(500).json({
                status: 'error',
                msg: err.message
            })
            
    }

})

router.post("/signin", async function(req, res){ 

    const {email, password} =   req.body

    const user =   await model.User.findOne({
        where: {
            email: email,
            role_id: 3
        }
    })

    if (!user) {
        return res.status(403).json({
            msg: 'email not found'
        })
    }

    try {

        if (user) {

            await bcrypt.compare(password, user.password, async function (err, resp) {

                if (!resp) {
                    return res.status(403).json({
                        msg: 'invalid credentials'
                    })
                }

                const token =   await jwt.sign({ 
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                        role_id: 3,
                                    }, "randomString",
                                        {
                                            expiresIn: 1000
                                        }
                                    )

                return res.json({
                    msg: 'login successfully',
                    token: token,
                    data: user
                }) 

            }) 
        }

    } catch (err) {

        return res.status(500).json({
            status: 'error',
            msg: err.message
        })

    }


})

router.delete('/:id/delete', async function(req, res, next) {

    try {
        
        const   complaint   =   model.Complaint.destroy({where: req.params.id})

        return res.status(202).json({
            mssg: 'success deleted data',
            data: complaint
        })

    } catch (err) {
        
        return res.status(500).json({
            status: 'error',
            msg: err.message
        })

    }

})


module.exports = router