import config from '.';

export default {
  infraestructure: {
    database    : config.databases.infraestructure.name,
    username    : config.databases.infraestructure.user,
    password    : config.databases.infraestructure.password,
    port        : config.databases.infraestructure.port,
    dialect     : 'mysql',
    logging     : false,
    host       : config.databases.infraestructure.host,
    define: {
      timestamp       : true,
      underscored     : false,
      underscoredAll  : false,
      freezeTableName : true,
      createdAt       : 'created_at',
      updatedAt       : 'updated_at',
    },
  },
};
