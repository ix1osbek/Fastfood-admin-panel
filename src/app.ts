import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import sequelize from "./config/db"
// import createSuperadmin from "./utils/create.superadmin"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
// createSuperadmin()

sequelize.authenticate()
.then(() => {
    console.log("Connection database successfully.")
})
.catch((err) => {
    console.error("Unable to connect to the database:", err)
})
  

export default app
