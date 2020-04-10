const express = require('express');
const cors = require('cors');
const path = require('path')
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'dist/crud-employees')));
}

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);