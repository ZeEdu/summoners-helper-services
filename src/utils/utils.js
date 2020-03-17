const Axios = require('axios').default;

class Utils {
  static async getVersion() {
    return new Promise((resolve, reject) => {
      Axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
        .then(res => {
          const [response] = res.data;
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
module.exports = Utils;
