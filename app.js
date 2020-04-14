const express = require('express');
const cors = require('cors');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + 'public/crud-employees'));

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);