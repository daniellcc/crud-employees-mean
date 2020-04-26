const express = require('express');
const cors = require('cors');
const fallback = require('express-history-api-fallback');
const { mongoose } = require('./DB');

const app = express();

const port = process.argv[2]; // get port from command line argument

const root = __dirname + '/public';

// public

// history fallback
app.use(fallback(__dirname + '/public/index.html'))

app.use(cors());



app.listen(port);