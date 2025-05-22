import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'


export class Category extends Model {
    public title!: string
    public img!: string
    id: any
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
       createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: "category",
    tableName: "categories",
    timestamps: true
})