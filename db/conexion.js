import { Sequelize } from 'sequelize';
import { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DATABASE_URL }  from '../config/config.js';

const opciones = {
    dialect: 'mysql',
    logging: false,
};

export const sequelize = DATABASE_URL
    ? new Sequelize(DATABASE_URL, opciones)
    : new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
          ...opciones,
          host: DB_HOST,
          port: DB_PORT || 3306,
      });