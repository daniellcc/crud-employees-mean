const express = require('express');
const cors = require('cors');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;



// middlewares
app.use(express.json());
app.use(cors());
app.get('*', (req, res) => res.sendFile(path.resolve('dist/crud-employees/index.html')))

// routes
app.use('/employees', require('./server/routes/employee.routes'));

app.listen(port);