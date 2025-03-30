import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from 'cookie-parser';
import cors from "cors";


const app = express();
dotenv.config();
app.use(cors());

const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB');
      } catch (error) {
        throw error;
      }
};

//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/rooms',roomsRoute);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
      success: false,
      status: statusCode,
      message: message,
  });
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});



app.listen(8008, () => {
    connect();
    console.log("Server is running at 8008");
});


