const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));



// routes
app.use('/employees', require('./server/routes/employee.routes'));


app.listen(port);