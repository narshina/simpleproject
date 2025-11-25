import express from 'express';
import { add, deleteuser, getall, update } from '../controller/usercontroller.js';

const userrouter = express.Router();


userrouter.post('/add',add)
userrouter.get('/getall',getall)
userrouter.put('/update/:id',update)
userrouter.delete('/delete/:id',deleteuser)

export default userrouter;