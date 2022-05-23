const dataMapper = require('../dataMapper.js');  
  
const deckController = {
    
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

module.exports = deckController;