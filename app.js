const express = require('express');
const cors = require('cors');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;



// middlewares
app.use(express.json());
app.use(cors());


// routes
app.use('/employees',
  require('./server/routes/employee.routes'),
  express.static('dist/crud-employees')
);

app.listen(port);