import express from "express";

import {createLodging, 
        updateLodging, 
        deleteLodging,
        getLodging,
        getLodgings} from "../controllers/lodging.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createLodging);

// READ
router.get("/:id", getLodging);

// UPDATE
router.put("/:id", verifyAdmin, updateLodging);

// DELETE
router.delete("/:id", verifyAdmin, deleteLodging);

// READ ALL
router.get("/", getLodgings)

export default router