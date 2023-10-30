import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Por favor ingrese el nombre."],
            maxlength: [60, "El nombre no puede exceder los 60 caracteres."],
        },
        email: {
            type: String,
            required: [true, "Por favor ingrese el email."],
            unique: true,
            validate: [validator.isEmail, "Por favor ingrese un email valido."],
        },
        password: {
            type: String,
            required: [true, "Por favor ingrese una contraseña."],
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    })

export default mongoose.model("User", UserSchema)