import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// REGISTER User
export const register = async (req, res, next) => {
    
    try {
        // Configuracion bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);    
        
        // Datos del nuevo usuario
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        })
        
        // Guardar nuevo usuario
        await newUser.save();
        
        // Enviar mensaje de nuevo usaurio guardado
        res.status(201).send("Usuario creado exitosamente!")
    } catch (err) {
        //next(createError(500, err))
        next(err);
    }
}

// LOGIN User
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user) return next(createError(404, "Email not found"))
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or email"))

        // Para evitar que salgan el password y si es admin en los datos mostrados
        const { password, isAdmin, ...userData } = user._doc;

        // Definicion de cookie
        const token = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_KEY)
        
        // Creacion de cookie
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...userData})
    } catch (err) {
        //next(createError(401, "Ha ocurrido un problema en el login de usuario."))
        next(err);
    }
}