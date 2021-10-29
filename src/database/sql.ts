import fs from 'fs';
import { Sequelize } from 'sequelize';

const databases = require('../../db/config/sequelize/databases');

const databasesConfig = Object.keys(databases);
const db : any = {};

databasesConfig.map((dbName: string) => {
  const dbConnection = databases[dbName];
  const { database, username, password } = dbConnection;

  db[database] = new Sequelize(database, username, password, { ...dbConnection, logging: false });
  db[database].dialect.supports.schemas = true;
  return db;
});

fs
  .readdirSync(__dirname)
  .filter((file: any) => fs.lstatSync(`${__dirname}/${file}`).isDirectory())
  .forEach((dbName: string) => {
    fs
      .readdirSync(`${__dirname}/${dbName}`)
      .filter((file: any) => {
        const isDirectory = fs.lstatSync(`${__dirname}/${dbName}/${file}`).isDirectory();
        const hasModel = fs.existsSync(`${__dirname}/${dbName}/${file}/${file}.model.js`);
        return isDirectory && hasModel;
      })
      .forEach((file: any) => {
        require(`${__dirname}/${dbName}/${file}/${file}.model.js`)(db[dbName.replace(/-/g, '_')], Sequelize);
      });

    return {};
  });

Object.keys(db).forEach((databaseName) => {
  const database = db[databaseName];

  Object.keys(database.models).forEach((modelName) => {
    if (database.models[modelName].associate) {
      database.models[modelName].associate(database.models);
    }
  });
});

export default db;
