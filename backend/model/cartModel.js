import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js'

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Cart;
