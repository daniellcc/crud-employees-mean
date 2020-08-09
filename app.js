const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('./configurations/DB');
const strategy = require('./configurations/passport-config');
const auther = require('./configurations/auther');
const app = express();

const port = process.env.PORT || 8000; // get port from command line argument

const root = __dirname + '/public';

// passport strategy
strategy();

app.use(express.urlencoded({ extended: false }));

// session
app.use(session({
  secret:'duckduckmastermind',
  saveUninitialized: false,
  resave: false,
  store: new mongoStore({
    mongooseConnection: mongoose.connection,
    autoRemove: 'native',
  })
}));
app.use(passport.initialize());
app.use(passport.session());



// middlewares
app.use(cors());
app.use(express.json());

// public
app.use(express.static(root));

// routes
app.use('/', auther.checkAuth);
app.use('/register', auther.checkAuth, require('./server/routes/register'));
app.use('/login', auther.checkAuth, require('./server/routes/login'));
app.use('/dashboard', auther.checkUnauth, require('./server/routes/dashboard'));
app.use('*', express.static(root));
app.listen(port);