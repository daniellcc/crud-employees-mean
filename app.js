const express = require('express');
const path = require('path')
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
		res.sendFile(__dirname + '/dist/view/crud-employees/index.html');
	});

// middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'dist/static')));
}

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);