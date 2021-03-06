require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database ***foodsharers***'))

app.use(express.json())

const foodsharersRouter = require('./routes/foodsharers')
app.use('/foodsharers', foodsharersRouter)

app.listen(3000, () => console.log('server started on port 3000...'))