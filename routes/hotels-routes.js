import express from "express";
import { createHotel, deleteHotel, getHotel, getHotelList, updateHotel } from "../controllers/hotel-controller.js";

const router = express.Router();

// Create
router.post("/", createHotel)

// Update
router.put("/:id", updateHotel)

// Delete
router.delete("/:id", deleteHotel)

// Get
router.get("/:id", getHotel)

// Get All
router.get("/", getHotelList)

export default router