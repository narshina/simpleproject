import  User  from "../models/user.js";

export const add = async (req, res) => {
    let newuser = new User(req.body)
    let response = await newuser.save()
    res.json(response)
    console.log(response);
}

export const getall = async (req, res) => {
    let users = await User.find()
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