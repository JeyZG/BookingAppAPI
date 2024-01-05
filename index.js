import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import apartmentsRoute from "./routes/apartments.js"
import usersRoute from "./routes/users.js"
import lodgingsRoute from "./routes/lodgings.js"
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()
dotenv.config()
app.use(cors());

// Conexion inicial a la base de datos
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Base de datos conectada!")
    } catch (error) {
        throw error;
    }
};

// Mandar mensaje para cuando la DB se desconecte del servidor
mongoose.connection.on('disconnected', () => {
    console.log("Desconectado de servidor Mongo!")
})

// Intentar reconectar al servidor de la DB
mongoose.connection.on('connected', () => {
    console.log("Conectado a servidor Mongo!")
})

//MiddleWares

app.use(cookieParser())
app.use(express.json())

// Rutas
app.use("/api/auth", authRoute)
app.use("/api/apartments", apartmentsRoute)
app.use("/api/users", usersRoute)
app.use("/api/lodgings", lodgingsRoute)

// Estructurando errores
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// Conectar el backend
app.listen(process.env.PORT, ()=> {
    connect()
    console.log("Servidor corriendo en puerto " + process.env.PORT);
})

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: `Happy Hacking! 😎🤟🏽 --> App: ${process.env.APPNAME}`
    })
})