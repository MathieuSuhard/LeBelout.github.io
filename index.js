const dotenv = require('dotenv');
const expressSession = require('express-session');
const express = require('express');
dotenv.config();
const initDeck = require("./app/middlewares/initDeck");


const PORT = process.env.PORT || 3000;
const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));


// cookie
app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "atelier Solo",
  cookie: {
    secure: false,
    maxAge: (1000*60*60) // ça fait une heure
  }
}));

app.use(initDeck);

app.use((req, res, next) => {
  console.log("Session: ", req.session);
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
