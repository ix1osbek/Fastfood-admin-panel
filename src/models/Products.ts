import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

export class Product extends Model{
    public title!: string
    public price!: number
    public description!: string
    public img!: string
    id: any
}


Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "product",
    tableName: "products",
    timestamps: false
})

