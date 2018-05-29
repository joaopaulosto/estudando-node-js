var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var booksURL = '/api/books';
var genresURL = '/api/genres'

app.use(express.json());

Genre = require('./models/genre');
Book = require('./models/book');

const port = 3000;

//Connect mongoose
mongoose.connect('mongodb://127.0.0.1/bookstore');
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Please use /api/books or /api/genres');
});

app.get(genresURL, function(req, res){
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

app.get(`${genresURL}/:_id`, function(req, res){
    Genre.getGenreById(req.params._id, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

app.post(genresURL, function(req, res){
    var genre = req.body;
    Genre.addGenre(genre, function(err, genre){
        if(err){
            console.error(err);
            throw err;
        }
        res.json(genre);
    });
});

app.put(`${genresURL}/:_id`, function(req, res){
    var id = req.params._id;
    console.log(`ID senviado: ${id}`);
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

app.delete(`${genresURL}/:_id`, function(req, res){
    var id = req.params._id;
    Genre.deleteGenre(id, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});




app.get(booksURL, function(req, res){
    Book.getBooks(function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.get(`${booksURL}/:_id`, function(req, res){
    Book.getBookById(req.params._id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.post(booksURL, function(req, res){
    var book = req.body;
    Book.addBook(book, function(err, book){
        if(err){
            console.error(err);
            throw err;
        }
        res.json(book);
    });
});

app.put(`${booksURL}/:_id`, function(req, res){
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.delete(`${booksURL}/:_id`, function(req, res){
    var id = req.params._id;
    Book.deleteBook(id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.listen(port, function(){
    console.log(`Book store running in port ${port}`);
});