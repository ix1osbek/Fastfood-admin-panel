
import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'
import { Order } from './order'

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
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id',
        }, onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true
})

Order.hasMany(User, { foreignKey: 'orderId', as: 'users' })
User.belongsTo(Order, { foreignKey: 'orderId', as: 'orders' })