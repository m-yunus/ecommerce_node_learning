const express=require('express');
const router=express.Router();
const users=require('../models/users')
const bcrypt=require('bcryptjs')
router.post('/',async (req,res)=>{
try {
    const user=await users.findOne({email:req.body.email})
    if(user){
        res.status(400).json({message:"user already exists",status:400})
        }   
        else{
            //encrypt password
            const saltRounds = 5;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const newUser=new users({
                name:req.body.name,
                email:req.body.email,
                password:hashedPassword
            })
            await newUser.save()
            res.status(200).json({message:"user created successfully",status:200})
            }
    
} catch (error) {
    res.json({message:"error in creating user"})

    
}
})
module.exports=router;