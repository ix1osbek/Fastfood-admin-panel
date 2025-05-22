import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { Category } from './category';

export class Product extends Model {
    public id!: number;
    public title!: string;
    public price!: number;
    public description!: string;
    public img!: string;
    public categoryId!: number; // foreign key
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
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
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
    modelName: 'product',
    tableName: 'products',
    timestamps: true,
});

Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' })
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' })