import express, { Router } from 'express';
import {verifyAdmin} from '../utils/VerifyToken.js'
import { CreateRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/room.js';

const router = express.Router();

//Create
router.post('/:hotelid',verifyAdmin,CreateRoom);

//Update
router.put('/:id',verifyAdmin,updateRoom);

//Delete
router.delete('/:id/:hotelid',verifyAdmin,deleteRoom);

//Get
router.get('/:id',getRoom);

//Get All
router.get('/', getRooms);


export default router