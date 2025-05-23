import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

export class Order extends Model {
    public id!: number
    public totalPrice!: number
    public status!: 'pending' | 'paid' | 'processing' | 'delivered' | 'cancelled'
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'processing', 'delivered', 'cancelled'),
        defaultValue: 'pending'
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: "order",
    tableName: "orders",
    timestamps: true
})
