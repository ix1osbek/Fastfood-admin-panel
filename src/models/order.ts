import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'
import { Client } from './client'

export class Order extends Model {
    public id!: number
    public clientId!: number
    public totalPrice!: number
    public status!: 'pending' | 'paid' | 'processing' | 'delivered' | 'cancelled'
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id'
        },
        onDelete: 'CASCADE' // mijoz o‘chsa, buyurtmalari ham o‘chadi
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'processing', 'delivered', 'cancelled'),
        defaultValue: 'pending'
    }
}, {
    sequelize,
    modelName: "order",
    tableName: "orders",
    timestamps: true
})
