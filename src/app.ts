import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import sequelize from "./config/db"
import authRouter from "./routes/auth.routes"
// import createSuperadmin from "./utils/create.superadmin"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
})) 
// createSuperadmin()
app.use("/auth", authRouter)

sequelize.authenticate()
    .then(() => {
        console.log("Connection database successfully.")
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err)
    })
export default app
