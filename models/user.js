import mongoose from "mongoose";

let userschema = new mongoose.Schema({  
    name: String,
    email: String,
    password: String
})

const User = mongoose.model("User", userschema);

export default User;