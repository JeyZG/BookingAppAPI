import mongoose from "mongoose";

const LodgingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Por favor ingrese el nombre del hospedaje."],
            unique: true,
            trim: true,
            maxLength: [100, "El nombre del hospedaje no debe exceder los 100 caracteres."],
        },
        type: {
            type: String,
            required: [true, "Por favor seleccione el tipo de hospedaje."],
            enum: {
                values: [
                    "Hotel",
                    "Edificio",
                    "Casa",
                    "Hostal",
                    "Albergue",
                    "Resort"
                ]
            },
        },
        desc: {
            type: String,
            required: [true, "Por favor ingrese la descripcion del hospedaje."],
            maxLength: [1000, "La descripcion del hospedaje no debe exceder los 1000 caracteres."],
        },
        services: {
            type: String,
            required: [true, "Por favor ingrese los servicios que ofrece el hospedaje."],
        },
        checkin: {
            type: String,
            required: [true, "Por favor ingrese la hora del check-in en formato hh:mm [am/pm]."],
        },
        checkout: {
            type: String,
            required: [true, "Por favor ingrese la hora del check-out en formato hh:mm [am/pm]."],
        },
        additionals: {
            type: String,
            required: [true, "Por favor ingrese los valores adicionales del hospedaje."],
        },
        address: {
            type: String,
            required: [true, "Por favor ingrese la direccion del hospedaje."],
        },
        city: {
            type: String,
            required: [true, "Por favor ingrese la ciudad donde esta ubicado el hospedaje."],
        },
        photos: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        apartments: {
            type: [String],
        }
    }
);

export default mongoose.model("Lodging", LodgingSchema)