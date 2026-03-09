const expres = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

router('/post', async (req, res) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)

        const user = await userModel.findOne({
            _id: decoded.id
        })

        req.user = user

    }catch(err){
        res.status(401).json({
            message: "Invalid token , please login again"
        })
    }

})

