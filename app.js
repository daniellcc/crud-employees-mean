const express = require('express');
const cors = require('cors');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8000; // get port from command line argument

const root = __dirname + '/public';



// public
app.use(express.static(root));

app.use('*', express.static(root));


// routes
app.use('/employees', require('./server/routes/employee.routes'));


app.listen(port);