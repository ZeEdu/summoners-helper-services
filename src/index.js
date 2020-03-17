require('dotenv').config();

const MongoClient = require('mongodb');

const championsController = require('./controller/championsController');
const championDAO = require('./dao/championsDAO');
const Utils = require('./utils/utils');

MongoClient.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    console.log('Injecting Database Connections');
    await championDAO.injectDB(client);
    console.log('Searching Patch Version...');
    const patchVersion = await Utils.getVersion();
    console.log(`Patch version: ${patchVersion}`);
    console.log('Updating Champions DB');
    const insertChampions = await championsController.UpdateChampionsBase(
      patchVersion
    );
    console.log(insertChampions);
  });
