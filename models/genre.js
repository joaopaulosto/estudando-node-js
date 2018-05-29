var mongoose = require('mongoose');

//Genre Schema
var genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

//Get Genres

module.exports.getGenres = function(callback, limit){
    Genre.find(callback).limit(limit);
}

module.exports.getGenreById = function(id, callback){
    Genre.findById(id, callback);
}

//Add Genre
module.exports.addGenre = function(genre, callBack){
    Genre.create(genre, callBack);
}

//Update Genre

module.exports.updateGenre = function(id, genre, options, callBack){
    var query = {_id: id};
    var update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query, update, options, callBack);
}

module.exports.deleteGenre = function(id, callback){
    var query = {_id: id};
    Genre.remove(query, callback);
}
