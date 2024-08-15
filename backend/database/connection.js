import { Sequelize } from 'sequelize';
import * as dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging:false
});

sequelize.authenticate()
    .then(() => {
        console.log("Successfully connected to the database!");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

// Sync models and start the server ..for sequelize 
sequelize.sync({ force: false })
    .then(() => {
        console.log("Database synced"); 
    })

export default sequelize;
