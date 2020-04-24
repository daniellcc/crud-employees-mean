const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const serveStatic = require('serve-static');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(compression());

app.use(express.static(__dirname, 'public'));

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// routes
app.use('/employees', require('./server/routes/employee.routes'));


app.listen(port);