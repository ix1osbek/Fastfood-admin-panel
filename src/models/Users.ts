
import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

export class User extends Model {
    public login!: string
    public password!: string
    public role!: "admin" | "superadmin"
  id: any
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("admin", "superadmin"),
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true
})

