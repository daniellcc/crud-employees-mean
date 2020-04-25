const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const compression = require('compression');
const serveStatic = require('serve-static');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

app.use(compression());

app.use(express.static(__dirname + '/public'));
app.use('*', express.static(__dirname + '/public'));

// routes
app.use('/employees', require('./server/routes/employee.routes'));


app.listen(port);