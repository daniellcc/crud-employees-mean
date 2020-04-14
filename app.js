const express = require('express');
const cors = require('cors');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.get('/', (req,res) => {
	res.sendFile(__dirname + '/dist/crud-employees/index.html');
});
app.use(express.static('dist/crud-employees'));

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);