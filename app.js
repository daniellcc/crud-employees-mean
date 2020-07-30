const express = require('express');
const cors = require('cors');
const { mongoose } = require('./configurations/DB');
const strategy = require('./configurations/passport-config');
const auther = require('./configurations/auther');
const { checkAuth, checkUnauth } = require('./configurations/auther');
const app = express();

const port = process.env.PORT || 8000; // get port from command line argument

const root = __dirname + '/public';

// passport strategy
strategy();

// middlewares
app.use(cors());
app.use(express.json());

// public
app.use(express.static(root));

// routes
app.use('/', checkAuth);
app.use('/register', checkAuth, require('./server/routes/register'));
app.use('/login', checkAuth, require('./server/routes/register'));
app.use('/dashboard', checkUnauth, require('./server/routes/dashboard'));
app.use('*', express.static(root));
app.listen(port);