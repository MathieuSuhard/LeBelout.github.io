const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');
const deckController = require('./controllers/deckController');


router.get('/', mainController.homePage);

// page article
router.get('/card/:id', mainController.oneCard);
// page pour afficher le deck
router.get('/deck', deckController.deckPage);
// page pour ajouter une carte au deck
router.get('/deck/add/:id', deckController.addToDeck);
// page pour supprimer une carte au deck
router.get("/deck/delete/:id", deckController.deleteDeck);
// page de recherche multi criteres
router.get('/search', searchController.searchPage);
// page de recherche par element :
router.get('/search/element', searchController.searchElement)
// page de recherche par level :
router.get('/search/level', searchController.searchLevel)
// page de recherche par Values :
router.get('/search/values', searchController.searchValues)
// page de recherche par Name :
router.get('/search/name', searchController.searchNames)


module.exports = router;