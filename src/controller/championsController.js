const Axios = require('axios').default;
const ChampionsDAO = require('../dao/championsDAO');

class ChampionsController {
  static async UpdateChampionsBase(patchVersion) {
    try {
      let data;
      console.log('Requesting data from CDN');
      await Axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion.json`
      )
        .then(res => {
          console.log('Parsing Data...');
          data = res.data.data;
        })
        .catch(e => console.log(e));
      console.log('Inserting data in the database');
      const insertResult = await ChampionsDAO.update(Object.values(data));
      if (insertResult.error) {
        return insertResult.error;
      }
      return insertResult.success;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

module.exports = ChampionsController;
