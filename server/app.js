const dotenv=require('dotenv')
const express= require('express')
const bodyParser = require("body-parser")
const app=express()
dotenv.config({path: './confiq.env'})

require('./db/conn')
// const User=require('./model/userSchema');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
  
//post method me code ko json me convert kr ke de rhe h
// app.use(express.json())

//We link router files
app.use(require('./router/auth'))
const PORT = process.env.PORT;-
//Middleware
// const middleware=(req,res,next)=>{
//   console.log(`hello my middleware`)
//   next();
// }

app.get("/",(req,res)=>{
 res.send(`hello world from the server`)
})

// app.get('/about',middleware ,(req,res)=>{
//     res.cookie("jwt","ABhi")
//     res.send(`hello world from the about`)
// })

app.listen(PORT,()=>{
    console.log(`app listen on ${PORT}`)
})