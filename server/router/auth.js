const express = require('express')
const bycrpt = require('bcryptjs')
var cors = require('cors')
const jwtToken = require('jsonwebtoken')
var app = express()
app.use(cors())

const router = express.Router()
const authenticate = require("../middleware/authenticate")
require("../db/conn")
const Users = require("../model/userSchema")
router.get('/', (req, res) => {
    res.send(`hello world from the server router js`)
})

//By Promises
// router.post ('/register',(req,res)=>{
//     console.log(req.body,'show me dat')
//     const {name,email,phone,work,password,cpassword}=req.body
//     console.log(name)
//     if(!name || !email || !phone || !work || !password || !cpassword){
//     return res.status(422).json({error:"Fill The Field Properly "})
//     }
//     Users.findOne({email:email}).then((userExist)=>{
//             if(userExist){
//                 return res.status(402).json({Email:"User already exist!"})
//             }
//             const user = new Users({name,email,phone,work,password,cpassword})
//             user.save().then(()=>{
//                     res.status(200).json({Messsage:'USer registerd successfully!'})
//             }).catch((error)=>{
//                 res.status(500).json({error:'Failed to registerd!'})
//             })
//     }).catch((err)=>{
//        console.log(err)
//     })
//     // res.json({message:req.body})
//     // res.send(`hello world from the server router js`)
// })

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Fill The Field Properly " })
    }
    try {
        const userExist = await Users.findOne({ email: email })
        if (userExist) {
            return res.status(402).json({ Email: "User already exist!" })
        }
        else if (password != cpassword) {
            return res.status(402).json({ error: "Passwor dose not match!" })
        }
        else {
            const user = new Users({ name, email, phone, work, password, cpassword })
            const data = await user.save()
            if (data) {
                res.status(200).json({ Messsage: 'USer registerd successfully!' })
            } else {
                res.status(400).json({ error: 'Something went wrong!' })
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        let token ;
        const { email, password } = req.body;
        // if (!email || !password) {
        //     return res.status(400).json({ error: "first filled th credentials" })
        // }
        const loginData = await Users.findOne({ email: email })
        if (loginData) {
            // console.log({loginData})
            const isMatch = await bycrpt.compare(password, loginData.password)
            console.log(isMatch,"isMatch")
          

            const token = await loginData.generateAuthToken()
            // console.log(token,"fvjkjvffkj")
            res.cookie("jwtoken",token,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true   
            })
            // console.log(token,"skdok")
            // const token = jwt.sign({ id: 7, role: "captain" }, "YOUR_SECRET_KEY");
            
            if (!isMatch) {
                return res.status(400).json({ error: "Invakied credentials" })
            }
            else {
                res.status(200).json({ message: "uselogin sucessfull",token })
            }
        }
    }
    catch (err) {
        console.log(err)
    }

})

router.get('/about',authenticate,(req,res)=>{
      console.log(token)
        res.cookie("jwt",token)
        res.send(req.rootUser) 
    })
module.exports = router









