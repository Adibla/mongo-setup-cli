const config = require('config');
const mongoose = require('mongoose');

const logger = require('pino')(config.log);

/* connect to the database */
const param = `mongodb://${config?.db?.connection?.user}:${config?.db?.connection?.password}@${config?.db?.connection?.host}:${config?.db?.connection?.port}/${config?.db?.connection?.database}?authMechanism=${config?.db?.connection?.authMechanism||'DEFAULT'}&authSource=${config?.db?.connection?.authSource ||'admin'}`;

const models = require('./models');

const { insertAllCollection, loadAllData} = require('./utils');

const start = () => {
  return mongoose.connect( param, {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(conn => loadAllData(config.db.seeds.directory))
    .then(seedsData => insertAllCollection(models, seedsData))
    .catch(err => {
      logger.error({data: err})
    })
    .finally(() => mongoose.connection.close())
}

module.exports = start;
