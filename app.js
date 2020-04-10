const express = require('express');
const cors = require('cors');
const path = require('path')
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

// static files
app.use(express.static(__dirname + '/dist/crud-employees'));

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + '/dist/crud-employees/index.html'))
});

app.listen(port);