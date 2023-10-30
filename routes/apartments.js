import express from "express";

import {createApartment, 
    updateApartment, 
    deleteApartment,
    getApartment,
    getApartments} from "../controllers/apartment.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:lodgingid", verifyAdmin, createApartment);

// UPDATE
router.put("/:id", verifyAdmin, updateApartment);

// DELETE
router.delete("/:id/:lodgingid", verifyAdmin, deleteApartment);

// GET
router.get("/:id", getApartment);

// GET ALL
router.get("/", getApartments)

export default router