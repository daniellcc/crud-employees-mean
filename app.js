const express = require('express');
const cors = require('cors');
const fallback = require('express-history-api-fallback');
const { mongoose } = require('./DB');

const app = express();

const port = process.argv[2]; // get port from command line argument

const root = __dirname + '/public';

app.use(cors());

// public
app.use(express.static(root));

// history fallback
app.use(fallback('index.html', { root }));


// routes
app.use('/employees', require('./server/routes/employee.routes'));


app.listen(port);