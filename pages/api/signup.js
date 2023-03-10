import initDB from "../../helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import Cart from "../../models/Cart";
initDB();

export default async (req,res)=>{
    const{name,password,email} = req.body;
    try {
        if(!name || !password || !email){
            return res.status(422).json({error:"Please all fields."})
            
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(422).json({error:"Email already registered."})
        }

        const hashedPassword=  await bcrypt.hash(password,12);
        const newUser = await new User({
            name,email,password:hashedPassword
        }).save();
        await new Cart({user:newUser._id}).save()
   
        res.status(201).json({message:"signup success"})
    } catch (error) {
        console.log(error);
    }
}