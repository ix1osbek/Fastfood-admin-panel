import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import sequelize from "./config/db"
import authRouter from "./routes/auth.routes"
import clientRouter from "./routes/client.routes"
import cookieParser = require("cookie-parser")
import { errorHandler } from './middlewares/error.middleware'
import { notFound } from './middlewares/notFound.middleware'

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
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger/auth.swagger.yaml'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter)
app.use(clientRouter)
app.use(notFound)
app.use(errorHandler)


////////// table yaratish

// ...

// sequelize.sync({ alter: false }) // yoki force: true
//   .then(() => {
//     console.log('Database va jadval(lar) yaratildi!');
//   })
//   .catch((err) => {
//     console.error('Xatolik:', err);
//   });
//////////////////////////

sequelize.authenticate()
    .then(() => {
        console.log("Connection database successfully.")
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err)
    })
export default app
