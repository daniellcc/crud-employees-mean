const express = require('express');
const cors = require('cors');
const path = require('path');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('*', express.static(path.join(__dirname, 'public')));

// routes
app.use('/employees', require('./server/routes/employee.routes'));


// not found 404
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	console.error(err.message);
	if(!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode.send(err.message));
})

app.listen(port);