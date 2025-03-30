import express, { Router } from 'express';
import Hotel from '../Models/Hotel.js';
import { createError } from '../utils/error.js';
const router = express.Router();
import { createHotel,updateHotel,deleteHotel,getHotel,getHotels, countByCity, countByType  } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/VerifyToken.js';

//Create
router.post('/',verifyAdmin,createHotel);

//Update
router.put('/:id',verifyAdmin,updateHotel);

//Delete
router.delete('/:id',verifyAdmin,deleteHotel);

//Get
router.get('/find/:id',getHotel);

//Get All
router.get('/', getHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);


export default router