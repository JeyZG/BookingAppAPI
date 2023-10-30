import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, 'Usuario no autorizado'));
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
        if(err) return next(createError(403, 'Token invalido!'));
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "No tiene autorizacion!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "No tiene autorizacion!"));
        }
    });
};