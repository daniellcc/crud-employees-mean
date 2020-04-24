const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const serveStatic = require('serve-static');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

app.use(compression());

app.use('/public', express.static(path.join(__dirname, '/')));

// routes
app.use('/employees', require('./server/routes/employee.routes'));


app.listen(port);