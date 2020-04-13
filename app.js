const express = require('express');
const cors = require('cors');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

// routes
app.use('/employees', require('./server/routes/employee.routes'));

// middlewares
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('dist'));
}



app.listen(port);