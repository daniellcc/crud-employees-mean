const express = require('express');
const cors = require('cors');
const path = require('path');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

// middlewares
app.use(cors());

app.use(express.static('public'));

// routes
app.use('/employees', require('./server/routes/employee.routes'));



app.listen(port);