const authSchema = require("../models/auth");
const multer = require("multer")
const path = require("path")





const register = async (req, res) => {
    try {
        const {username , email , password} = req.body
        const profileImage = req.file ? `/uploads/${req.file.filename}` : '';

        const user = await authSchema.findOne({email})
        const usercontrol = await authSchema.findOne({username})
    
        if(user){return res.status(500).json({message : "kullanici kayitli"})}
        if(usercontrol){return res.status(500).json({message:"başka "})}
    
       const newUser = await authSchema.create({
            username,
            email,
            password,
            profileImage:profileImage
        })
    
        res.status(200).json({name : newUser})
    } catch (error) {
        console.log(error)
    }

   
};



const login = async(req, res) => {

    try {
        const {email , password} = req.body

    const user = await authSchema.findOne({email})

    if(!user){
        return res.status(500).json({message : "kullanici yok"})
    }

    if(password !== user.password){
        return res.status(500).json({message:"şifre yanlis"})
    }

    res.status(200).json({name : user.username})
    console.log(user.username)
    return user.username
    
    
    } catch (error) {
        console.log(error)
    }};



    const getUsers = async(req , res)=>{

        try {
            const response = await authSchema.find({})
            res.status(200).json({message : "OK" , eyup : response})
            return response
        } catch (error) {
            console.log(error);
        }
        

}


module.exports = { register, login , getUsers };
