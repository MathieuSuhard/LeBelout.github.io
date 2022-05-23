const dataMapper = require('../dataMapper.js');

const mainController = {
  homePage: (req, res) => {
    dataMapper.getAllCards( (err, results) => {
      if(err) {
        console.error(err);
        return;
      } 
      res.render('cardList', {
        cards: results.rows,
        title: 'Liste des cartes'
      })
    });
  },

  oneCard: async (req, res, next) => {
    try{
      const card = await dataMapper.getCard((Number(req.params.id)));
      const cardDetail = card[0];
      if (!cardDetail){
        return next();
      }
      res.render("card", { cardDetail });
     
    } catch (err){
      rescape.status(500).send(err.message);
    } 
    
  },
  
  deckPage: (req, res) => {
    const cards = req.session.deck;
    res.render("deck", { cards } );
  },

  addToDeck: async (req, res) => {
    const cardId = Number(req.params.id);
    const deckFound = req.session.deck.find(
      (card) => card[0].id === cardId
    );
    if ((!deckFound) && (req.session.deck.length < 5)) {
      try {
        const cardToAdd = await dataMapper.getCard(cardId);
        req.session.deck.push(cardToAdd);
        res.redirect("/deck");
      } catch (err) {
        console.error(err);
        res.status(500).send("an error occurred");
      }
    } else {
      res.redirect("/deck");
    }
  },

  deleteDeck: (req, res) => {
    const cardId = Number(req.params.id);
    req.session.deck = req.session.deck.filter(
      (card) => card[0].id !== cardId
    );
    res.redirect("/deck");
  },






};

module.exports = mainController;