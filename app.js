const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const serveStatic = require('serve-static');
const { mongoose } = require('./DB');

const app = express();

const port = process.env.PORT || 8080

app.use(compression());
app.use(cors());

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
    next => app.use(express.static(path.join(__dirname)));
})

// routes
app.use('/employees', require('./server/routes/employee.routes'));


app.listen(port);