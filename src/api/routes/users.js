import express, { Router } from 'express';
import { updateUser,deleteUser,getUser,getUsers } from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../utils/VerifyToken.js';


const router = express.Router();

router.get('/checkAuthentication',(req,res,next)=>{
    res.send("Welcome");
})

//Update
router.put('/:id',verifyUser,updateUser);

//Delete
router.delete('/:id',verifyUser,deleteUser);

//Get
router.get('/:id',verifyUser,getUser);

//Get All
router.get('/', verifyAdmin,getUsers);


export default router