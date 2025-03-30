import User from "../Models/User.js";

export const updateUser=async(req,res,next)=>{
    try {
            
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true});
        res.status(201).json(updatedUser);
        } catch (error) {
            next(error);
        }
}
export const deleteUser=async(req,res,next)=>{
    try {
            
            await User.findByIdAndDelete(req.params.id);
            res.status(201).json("Deleted");
        } catch (error) {
            next(error);
        }
}
export const getUser=async(req,res,next)=>{
    try {
           const user=await User.findById(req.params.id);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
}
export const getUsers=async(req,res,next)=>{
    const failed = false;
        if (failed) {
            return next(createError(401, "You are not authenticated")); // Now next is accessible
        }
    
        try {
            const users = await User.find();
            res.status(201).json(users);
        } catch (error) {
            next(error);
        }
}