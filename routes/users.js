import express from "express";

import {updateUser, 
    deleteUser,
    getUser,
    getUsers} from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

/*

// ************* Descomentar si se desean usar estas verificaciones
// CHECK TOKEN
router.get("/checktkn", verifyToken, (req, res, next) => {
    res.send("You're logged in!")
});

// VERIFY USER
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("You're logged in and you can delete your account")
});

// VERIFY ADMIN
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("You're logged in and you can delete all accounts")
});
*/

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", verifyAdmin, getUsers)

export default router