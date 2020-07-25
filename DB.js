const mongoose = require('mongoose');

const URI = 'mongodb+srv://daniel:santinojardani@cluster0-ynpa7.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false })
	.then(db => console.log('db connected'))
	.catch(err => console.error(err))

module.exports = mongoose;