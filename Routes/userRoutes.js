import express from 'express';
import { add, deleteuser, getall, login, register, update, viewprofile } from '../controller/usercontroller.js';

const userrouter = express.Router();


userrouter.post('/add',add)
userrouter.get('/getall',getall)
userrouter.put('/update/:id',update)
userrouter.delete('/delete/:id',deleteuser)
userrouter.post("/register",register)
userrouter.post("/login",login)
userrouter.get("/viewprofile/:id",viewprofile)

export default userrouter;