let champions;
class ChampionsDAO {
  static async injectDB(conn) {
    if (champions) {
      return;
    }
    try {
      champions = await conn
        .db(process.env.SUMMONERS_NS)
        .collection('championsBase');
    } catch (e) {
      console.error(e);
    }
  }

  static async update(insertChampions) {
    try {
      const result = await champions.insertMany(insertChampions);
      console.log(result);
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while inserting data, ${e}`);
      return { error: e };
    }
  }
}

module.exports = ChampionsDAO;
