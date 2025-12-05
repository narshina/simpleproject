import  User  from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const add = async (req, res) => {
    let newuser = new User(req.body)
    let response = await newuser.save()
    res.json(response)
    console.log(response);
}

export const getall = async (req, res) => {
    let users = await User.find()
    console.log();
    
    res.json(users)
}   

export const update=async (req, res) => {
    let id=req.params.id
    let updateduser=await User.findByIdAndUpdate(id, req.body,{new:true})
    res.json(updateduser)
}

export const deleteuser=async (req, res) => {
    let id=req.params.id
    let deleteduser=await User.findByIdAndDelete(id)
    res.json(deleteduser)
}

export const register= async(req,res)=>{
     try{
        const existingmail = await User.findOne({ email:req.body.email });

        if(existingmail){
            return res.status(400).json('mail already exist');        

        }
             const hashedPassword=await bcrypt.hash(req.body.password,10)
             console.log(hashedPassword);
             const userData={...req.body,password:hashedPassword}
            
             const newuser=await new User(userData)
             const saveduser=await newuser.save()
            return res.json(saveduser)
             
     }
     catch(e){
        console.error(e);
       return res.status(500).json({message:"error occured during register"})
     }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        let response=await User.findOne({email:email})
        if(!response){
            return res.status(500).json("user not found")
        }
        console.log(response);
        let matchedpassword=await bcrypt.compare(password,response.password)
        console.log(matchedpassword);
        if(!matchedpassword){
            return res.status(401).json("invalid username");
        }
        const token = jwt.sign(
            {
                userId: response._id,
                email: response.email,
            },
            "abc",
            { expiresIn: "1h" }
        );

        return res.status(201).json({ message: "Login successful", 
            token: token,
            _id: response._id,
         });          
    }
    catch(e){
        res.status(500).json(e.message)
    }   
}


export const viewprofile=async(req,res)=>{
    let id=req.params.id
    let user=await User.findById(id)
    res.json(user)  

}