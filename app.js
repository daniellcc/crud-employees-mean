const express = require('express');
const path = require('path')
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

// middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
	app.use( express.static(path.join(__dirname, 'dist/crud-employees')));
	app.use('/', express.static(path.join(__dirname, 'dist/crud-employees')));
}

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);