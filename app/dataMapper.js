const database = require('./database');

const dataMapper = {

  /* requete pour la liste des cartes */
  getAllCards: function (callback) {
    const query = {
      text : `SELECT * FROM "card"`
    };
    database.query(query, callback);
  },
  /* requete pour recuperer une carte par ID */

  getCard: async (id) => {
    const querySql = {
      text: `SELECT * FROM "card" WHERE "id" = $1`,
      values: [id],
    };
    const result = await database.query(querySql);
    return result.rows;
  },
  /* requete pour recuperer les cartes par élément */
  getCardsElement: async (element) => {
    const querySql = {
      text: `SELECT * FROM "card" WHERE "element" = $1`,
      values: [element],
    };
    const result = await database.query(querySql);
    if (!result.rows[0]) {
      const result = await database.query(`SELECT * FROM "card" WHERE "element" IS NULL`);
      return result.rows;
    }
    return result.rows;
  },
  /* requete pour recuperer les cartes par level */
  getCardsLevel: async (level) => {
    const querySql = {
      text: `SELECT * FROM "card" WHERE "level" = $1`,
      values: [level],
    };
    const result = await database.query(querySql);
    return result.rows;
  },
  /* requete pour recuperer les cartes par direction et valeur */
  getCardsValues: async (values) => {
    console.log(values.direction);
    const direction = 'value_' + values.direction;
    const querySql = {
      text: `SELECT * FROM "card" WHERE "${direction}" = $1`,
      values: [values.value]
    };
    const result = await database.query(querySql);
    return result.rows;
  },
  /* requete pour recuperer les cartes par nom */

  getCardsName: async (name) => {
    console.log(name.name);
    const namecard = name.name;
    const querySql = {
      text: `SELECT * FROM "card" WHERE lower(name) LIKE '%${namecard}%'`
    };
    const result = await database.query(querySql);
    console.log(result);
    return result.rows;
  }

};

module.exports = dataMapper;