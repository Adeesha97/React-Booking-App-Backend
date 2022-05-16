import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// import routes
import authRoutes from "./routes/auth-routes.js"
import usersRoutes from "./routes/users-routes.js"
import roomsRoutes from "./routes/rooms-routes.js"
import hotelsRoutes from "./routes/hotels-routes.js"

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected.");
});

//middleware
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/hotels", hotelsRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack:err.stack,
  })
})


app.listen(8080, () => {
  connect();
  console.log("connected to backend.");
});
