const express = require('express');
const cors = require('cors');
const path = require('path');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', express.static(path.join(__dirname, 'index.html')));

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);