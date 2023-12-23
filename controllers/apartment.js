import Apartment from "../models/Apartment.js";
import Lodging from "../models/Lodging.js";
import { createError } from "../utils/error.js";

// CREATE Apartment
export const createApartment = async (req, res, next) => {

    const LodgingId = req.params.lodgingid;
    const newApartment = new Apartment(req.body)
    try {
        const savedApartment = await newApartment.save();
        try {
            await Lodging.findByIdAndUpdate(LodgingId, {
                $push: { apartments: savedApartment._id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedApartment);
    } catch (err) {
        next(err);
    }
};

// READ Apartment
export const getApartment = async (req, res, next) => {
    try {
        const apartment = await Apartment.findById(req.params.id)
        res.status(200).json(apartment)
    } catch (err) {
        next(err);
    }
};

// UPDATE Apartment
export const updateApartment = async (req, res, next) => {
    try {
        const updatedApartment = await Apartment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });
        //if (!updatedApartment) {
            return res.status(200).json(updatedApartment)
        /*} else {
            //next(createError(500, "Se presentó un error en la solicitud!"));
            next();
        }*/
    } catch (err) {
        next(err);
    }
};

// DELETE Apartment
export const deleteApartment = async (req, res, next) => {

    const LodgingId = req.params.Lodgingid;

    try {
        await Apartment.findByIdAndDelete(req.params.id);
        try {
            await Lodging.findByIdAndUpdate(LodgingId, {
                $pull: { apartments: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("El apartamento ha sido eliminado!")
    } catch (err) {
        next(err);
    }
};

// READ All Apartments
export const getApartments = async (req, res, next) => {
    try {
        const apartments = await Apartment.find(req.query)
        res.status(200).json(apartments)
    } catch (err) {
        next(err);
    }
};