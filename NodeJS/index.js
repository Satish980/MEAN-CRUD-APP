const express = require('express')
const cors = require('cors')

const {mongoose} = require('./db.js')
var noticeController = require('./controllers/noticeController.js')

var app = express()
app.use(express.json())
app.use(cors({origin: 'http://localhost:4200'}))

app.listen(3000, ()=> console.log('Server Started at port number : 3000'))

app.use('/notices',noticeController)