import sequelize from '../database/connection.js';
import { DataTypes } from 'sequelize';
const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Category;
