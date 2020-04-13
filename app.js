const express = require('express');
const cors = require('cors');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/dist/index.html');
})

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);