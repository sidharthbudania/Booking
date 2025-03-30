import Hotel from "../Models/Hotel.js";

export const createHotel=async(req,res,next)=>{
    const newHotel=new Hotel(req.body);
    try {
        
        const savedHotel=await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        next(error);
    }
}

export const updateHotel=async(req,res,next)=>{
    try {
            
        const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true});
        res.status(201).json(updatedHotel);
        } catch (error) {
            next(error);
        }
}
export const deleteHotel=async(req,res,next)=>{
    try {
            
            await Hotel.findByIdAndDelete(req.params.id);
            res.status(201).json("Deleted");
        } catch (error) {
            next(error);
        }
}
export const getHotel=async(req,res,next)=>{
    try {
           const hotel=await Hotel.findById(req.params.id);
            res.status(201).json(hotel);
        } catch (error) {
            next(error);
        }
}
export const getHotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;

    console.log("Received Query Parameters:", req.query);

    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: Number(min) || 1, $lt: Number(max) || 1000 },
        })
        .limit(Number(limit) || 10);

        console.log("Fetched Hotels from DB:", hotels);

        res.status(200).json(hotels);
    } catch (error) {
        console.error("Error fetching hotels:", error);
        next(error);
    }
};




export const countByCity=async(req,res,next)=>{
    const failed = false;
    const cities=req.query.cities.split(",");

        if (failed) {
            return next(createError(401, "You are not authenticated")); // Now next is accessible
        }
    
        try {
            const hotels = await Hotel.find();
            const list=await Promise.all(cities.map(city=>{
                return Hotel.countDocuments({city:city})
            }))
            res.status(201).json(list);
        } catch (error) {
            next(error);
        }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelcount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentcount = await Hotel.countDocuments({ type: "apartment" });
        const resortcount = await Hotel.countDocuments({ type: "resort" });
        const villacount = await Hotel.countDocuments({ type: "villa" });
        const cabincount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotels", count: hotelcount },
            { type: "apartments", count: apartmentcount },
            { type: "resorts", count: resortcount },
            { type: "villas", count: villacount },
            { type: "cabins", count: cabincount },
        ]);
    } catch (error) {
        next(error);
    }
};

