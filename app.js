const express = require('express')
const app = express()
const healthAppRouter = require('./routes/healthAppRoutes')
const middleware = require('./utils/middleware')
const cors = require('cors')
const cookieParser = require('cookie-parser');

require('dotenv').config()

app.use(express.static('build'))
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true}))
app.use(middleware.requestLogger)

app.use('/api/', healthAppRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app