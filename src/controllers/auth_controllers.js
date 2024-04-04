const Response = require("../utils/response")
const user = require("../models/user.model")
const bcrypt = require("bcrypt")
const ApiError = require("../utils/errors")

const login = async (req, res) =>{
    console.log(req.body)   
    return res.json(req.body)
}
const register = async (req, res) =>{
    const {email } = req.body

    const userCheck = await user.findOne({
        email
    })

    if(userCheck){
        throw new ApiError("email already using", 401)
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

   
        const userSave = new user(req.body)
        await userSave.save().then((data) =>{

            return new Response(data,"Signup successful").created(res)
           
        }).catch((err) =>{
            throw new ApiError("User couldn't create", 400)      
        })
   

    console.log(req.body)   
}
module.exports = {
    login,
    register
}