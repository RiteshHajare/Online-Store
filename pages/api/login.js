import initDB from "../../helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

initDB();

export default async (req,res)=>{
    const{password,email} = req.body;
    try {
        if( !password || !email){
            return res.status(422).json({error:"Please all fields."})
            
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error:`User with ${email} not found`})
        }

       const doMatch = await bcrypt.compare(password,user.password)
       if(doMatch){
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
                expiresIn:"7d"
            })
            const {name,email,role} = user;
            res.status(201).json({token,role})
       }else{
        res.status(401).json({error:"email or password dont match"})
       }
       
    } catch (error) {
        console.log(error);
    }
}