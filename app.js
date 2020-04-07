const express = require('express');
const cors = require('cors');
const { mongoose } = require('./DB');
const disDir = __dirname + '/dist/';

const app = express()

const port = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(distDir));

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);