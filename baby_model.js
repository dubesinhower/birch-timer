var mongoose = require('mongoose');

var babySchema = mongoose.Schema({   
    name: String
});

module.exports = mongoose.model('Baby', babySchema);