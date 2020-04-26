const express = require('express');
const cors = require('cors');
const fallback = require('express-history-api-fallback');
const { mongoose } = require('./DB');

const app = express();

const port = process.argv[2]; // get port from command line argument

const root = `${__dirname}/public`;

// public
app.use(express.static(root));

// history fallback
app.use(fallback('index.html', { root }));

app.use(cors());



app.listen(port);