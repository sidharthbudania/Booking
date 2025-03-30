import Room from "../Models/Room.js";
import Hotel from "../Models/Hotel.js";
import {createError} from "../utils/error.js"


export const CreateRoom =async (req,res,next)=>{
    const hotelId=req.params.hotelid;
    const newRoom= new Room(req.body);

    try {
        const savedRoom=await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms: savedRoom._id},
            });
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}


export const updateRoom=async(req,res,next)=>{
    try {
            
        const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true});
        res.status(201).json(updatedRoom);
        } catch (error) {
            next(error);
        }
}
export const deleteRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelid;
    try {
            await Room.findByIdAndDelete(req.params.id);
            try {
                await Hotel.findByIdAndUpdate(hotelId,{
                    $pull:{rooms: req.params.id},
                });
            } catch (error) {
                next(error);
            }
            res.status(201).json("Deleted");
        } catch (error) {
            next(error);
        }
}
export const getRoom=async(req,res,next)=>{
    try {
           const room=await Room.findById(req.params.id);
            res.status(201).json(room);
        } catch (error) {
            next(error);
        }
}
export const getRooms=async(req,res,next)=>{
    const failed = false;
        if (failed) {
            return next(createError(401, "You are not authenticated")); // Now next is accessible
        }
    
        try {
            const rooms = await Room.find();
            res.status(201).json(rooms);
        } catch (error) {
            next(error);
        }
}
