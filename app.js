const express = require('express');
const cors = require('cors');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8000;

const root = __dirname + '/public';

app.use(cors());
app.use(express.json());

// public
app.use(express.static(root));

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.use('*', express.static(root));
app.listen(port);