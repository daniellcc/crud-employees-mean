const express = require('express');
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());


app.use('/public', serveStatic(path.join(__dirname, 'public')));

// routes
app.use('/employees', require('./server/routes/employee.routes'));



app.listen(port);