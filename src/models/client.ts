import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'


export class Client extends Model {
    public name!: string
    public surname!: string
    public phone!: string
    id: any
}


Client.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^\+998\d{9}$/i  
        }
    }
}, {
    sequelize,
    modelName: "client",
    tableName: "clients",
    timestamps: true
})