const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app_01');
mongoose.Promise = global.Promise;

module.exports = mongoose;