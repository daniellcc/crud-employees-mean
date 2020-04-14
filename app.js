const express = require('express');
const cors = require('cors');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('dist/crud-employees'));
app.use('/dist/crud-employees', express.static('dist/crud-employees/'))

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);