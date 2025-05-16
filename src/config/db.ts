import { Sequelize} from "sequelize"
import dotenv from "dotenv"
dotenv.config()


const sequelize = new Sequelize({
    host: process.env.DB_HOST   as string,
    port: Number(process.env.DB_PORT) as number,
    database: process.env.DB_NAME as string,
    username: process.env.DB_USER   as string,
    password: process.env.DB_PASSWORD as string,
    dialect: "postgres",
    logging: false,
})


// sequelize.authenticate()
// .then(() => {
//     console.log("Connection database successfully.")
// })
// .catch((err) => {
//     console.error("Unable to connect to the database:", err)
// })

export default sequelize