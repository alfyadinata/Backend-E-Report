const createError = require('http-errors')
const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
var cors = require('cors')
const expressValidator = require('express-validator')


const indexRouter     = require('./routes/index')
const usersRouter     = require('./routes/users')
const authRouter      = require('./routes/auth')
const complaintRouter = require('./routes/complaint')
const categoryRouter  = require('./routes/category')

const app = express()
// Middleware
app.use(cors(), bodyParser.json())
app.use(expressValidator())

const auth  = require('./middleware/auth')
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', auth, usersRouter)
app.use('/auth', authRouter)
app.use('/complaint', auth, complaintRouter)
app.use('/category', categoryRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
