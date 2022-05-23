const dataMapper = require("../dataMapper");

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },
  searchElement: async (req, res, next) => {
    const cardElement = req.query.element;
    try {
      const cardsElement = await dataMapper.getCardsElement(cardElement);
      if (!cardsElement) {
        return next();
      }
      res.render("cardList", {
        title: 'Liste des cartes par élément : ' + cardElement
        ,cards: cardsElement
      }); 
    } catch (err) {
      res.status(500).send("an error occurred");
    } 
    
  },

  searchLevel: async (req, res, next) => {
    const cardLevel = req.query.level;
    try {
      const cardsLevel = await dataMapper.getCardsLevel(cardLevel);
      if (!cardsLevel) {
        return next();
      }
      res.render("cardList", {
        title: 'Liste des cartes par Niveau : ' + cardLevel
        ,cards: cardsLevel
      }); 
    } catch (err) {
      res.status(500).send("an error occurred");
    } 
    
  },

  searchValues: async (req, res, next) => {
    const cardValues = req.query;
    console.log(cardValues.direction, 'Direction');
    console.log(cardValues.value, 'value');
    try {
      const cardsValues = await dataMapper.getCardsValues(cardValues);
      if (!cardsValues) {
        return next();
      }
      res.render("cardList", {
        title: 'Liste des cartes par Niveau : '
        ,cards: cardsValues
      }); 
    } catch (err) {
      res.status(500).send("an error occurred");
    } 
    
  },

  
  searchNames: async (req, res, next) => {
    const cardNames = req.query;
    console.log(cardNames, 'req.query');
    try {
      const cardsNames = await dataMapper.getCardsName(cardNames);
      if (!cardsNames) {
        return next();
      }
      res.render("cardList", {
        title: 'Liste des cartes par Niveau : '
        ,cards: cardsNames
      }); 
    } catch (err) {
      res.status(500).send("an error occurred");
    } 
    
  },
};

module.exports = searchController;