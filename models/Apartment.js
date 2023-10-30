import mongoose from "mongoose";

const ApartmentSchema = new mongoose.Schema(
	{
		name:{
			type: String,
			required: [true, "Por favor ingrese el nombre del apartamento."],
			trim: true,
			maxLength:[100, "El nombre del apartamento no debe exceder los 100 caracteres."],
		},
		desc:{
			type: String,
			required: [true, "Por favor ingrese la descripcion del apartamento."],
			maxLength:[1000, "La descripcion del apartamento no debe exceder los 1000 caracteres."],
		},
		category:{
			type: String,
			required: [true, "Por favor ingrese la categoria del apartamento."],
		},
		roomsNumber: {
			type: Number,
			required: [true, "Por favor ingrese el numero de habitaciones del apartamento."],
		},
		bathNumber: {
			type: Number,
			required: [true, "Por favor ingrese el numero de baños del apartamento."],
		},
		pax: {
			type: Number,
			required: [true, "Por favor ingrese la capacidad del apartamento."],
		},
		area: {
			type: Number,
			required: [true, "Por favor ingrese el area del apartamento."],
		},
		acNumber: {
			type: Number,
			required: [true, "Por favor ingrese el numero de aires del apartamento."],
		},
		additionals:{
			type: String,
			required: [true, "Por favor ingrese los valores adicionales del apartamento."],
		},
		basePrice: {
			type: Number,
			required: [true, "Por favor ingrese el precio base del apartamento."],
		},
		unAvailableDates: { 
			type: [Date],
			required: [true, "Por favor ingrese las fechas de ocupación del apartamento."],
		},
		photos:[
			{
				public_id:{
					type: String,
					required: true
				},
				url:{
					type: String,
					required: true
				}
			}
		],
		videoUrl:{
			type: String,
			required: [true, "Por favor ingrese la url del video promocional del apartamento."],
		},
		featured:{
			type: Boolean,
			default: false
		},
		rating: {
			type: Number,
			default: 0
		},
		ratingNumber: {
			type: Number,
			default: 0
		},
		reviews:[
			{
				client:{
					type: String,
					required: true
				},
				rating:{
					type: Number,
					required: true
				},
				comment:{
					type: String,
					required: true
				}
			}
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Apartment", ApartmentSchema);
