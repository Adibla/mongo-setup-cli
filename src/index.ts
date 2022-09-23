import * as config from "config";
import * as mongoose from "mongoose";

/* connect to the database */
const param = `mongodb://${config?.db?.connection?.user}:${config?.db?.connection?.password}@${config?.db?.connection?.host}:${config?.db?.connection?.port}/${config?.db?.connection?.database}?authMechanism=${config?.db?.connection?.authMechanism||'DEFAULT'}&authSource=${config?.db?.connection?.authSource ||'admin'}`;

const models = require('./models');

const { insertAllCollection, loadAllData} = require('./utils');

const start = () => {
  // @ts-ignore
    return mongoose.connect( param, {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(conn => loadAllData(config.db.seeds.directory))
    .then(seedsData => insertAllCollection(models, seedsData))
    .catch(err => {
      console.error("Mongo connection failed!", err);
    })
    .finally(() => mongoose.connection.close())
}

export{ start };
