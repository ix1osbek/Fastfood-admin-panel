import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import sequelize from "./config/db"
import authRouter from "./routes/auth.routes"
import cookieParser = require("cookie-parser")

//////////// swagger uchun

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'
import path from 'path';

// import createSuperadmin from "./utils/create.superadmin"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
})) 
app.use(cookieParser())
// createSuperadmin()
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger/auth.swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter)

sequelize.authenticate()
    .then(() => {
        console.log("Connection database successfully.")
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err)
    })
export default app
