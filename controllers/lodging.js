import Lodging from "../models/Lodging.js";

// CREATE Lodging
export const createLodging = async(req, res, next) => {
    const newLodging = new Lodging(req.body)
    try{
        const savedLodging = await newLodging.save();
        res.status(200).json(savedLodging);
    } catch(err){
        next(err);
    }
};

// READ Lodging
export const getLodging = async (req, res, next) => {
    try{
        const lodging = await Lodging.findById(req.params.id)
        res.status(200).json(lodging)
    } catch(err){
        next(err);
    }
};

// UPDATE Lodging
export const updateLodging = async (req, res, next) => {
    try{
        const updatedLodging = await Lodging.findByIdAndUpdate(
                req.params.id, 
                { $set: req.body}, 
                {new : true});

        res.status(200).json(updatedLodging)
    } catch(err){
        next(err);
    }
};

// DELETE Lodging
export const deleteLodging = async (req, res, next) => {
    try{
        const lodging = await Lodging.findById(req.params.id)

        if(lodging){
            await Lodging.findByIdAndDelete(req.params.id);
            res.status(200).send("El hospedaje ha sido eliminado.");
        }else{
            res.status(200).send("El hospedaje buscado no existe.")
        }
        
    } catch(err){
        next(err);
    }
};

// READ All Lodgings
export const getLodgings = async (req, res, next) => {
    try{
        const lodgings = await Lodging.find()
        res.status(200).json(lodgings)
    } catch(err){
        next(err);
    }
};