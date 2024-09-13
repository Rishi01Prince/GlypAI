const express = require('express');
const app = express();
const db = require('./db');
const morgan = require('morgan');
const cors = require("cors");

const cookieSession = require("cookie-session");

const routes = require('./Routes'); 

app.use(express.json());
app.use(morgan('dev'));

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);


app.use(
  cors({
    origin: '*',
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use('/', routes); 

app.get('/', (req, res) => {
  res.send('You are successfully connected to the app!');
});

module.exports = app;
