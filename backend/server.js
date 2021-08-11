const express = require('express')
const helmet =  require('helmet')
const dontenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
//Routes
const standardsRouter = require('./routes/standarts')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const app = express()
dontenv.config()
//Server start

mongoose.connect(process.env.MONGO_URL, 
{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Connected to the database'))
.catch(err =>console.log(err))


//Env PORT
let port = process.env.PORT || 5000

//Middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use('/api/standards',standardsRouter)
app.use('/api/users',usersRouter)
app.use('/api/auth',authRouter)

  
app.listen(port,()=>{
    console.log('Server is listening on the port 5000 ...')
})