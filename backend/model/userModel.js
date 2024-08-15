
import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js'

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type:DataTypes.ENUM('customer','admin'),
        defaultValue:'customer'
    }
});

export default User;
