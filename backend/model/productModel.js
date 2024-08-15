import sequelize from '../database/connection.js';
import { DataTypes } from 'sequelize';
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productDescription: {
        type: DataTypes.STRING,
    },
    productPrice: {
        type: DataTypes.INTEGER,
    },
    productTotalStockQty: {
        type: DataTypes.INTEGER,
    },
    productImageUrl: {
        type: DataTypes.STRING,
    } 
});

export default Product;
