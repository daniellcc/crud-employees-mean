const express = require('express');
const cors = require('cors');
const path = require('path');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());

app.get('*', express.static(path.join(__dirname, 'index.html')));

app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);