/* CREATE API ON LOCAL SERVER*/

const express = require('express');
var bodyParser = require('body-parser');
const db = require('./database');

const bookApp = express();

//use dataTypes other than string
bookApp.use(bodyParser.urlencoded({ extended: true }));

//Use json dataType
bookApp.use(bodyParser.json());


/* GET */

//Route /
//Description Get all books
//Access PUBLIC
//Parameter NONE
//Method GET 

bookApp.get('/', (req, res) => {
    return res.json({ books: db.Books });
});

//Get specific book by ISBN
bookApp.get('/is/:ISBN', (req, res) => {
    const getspecificBook = db.Books.filter((book) =>
        book.ISBN === req.params.ISBN
    );

    return getspecificBook.length === 0 ? res.json({ error: `No results found for ${req.params.ISBN}` }) : res.json({ book: getspecificBook })
});

//Get books based on category
bookApp.get('/c/:category', (req, res) => {
    const getspecificBook = db.Books.filter((book) => book.category.includes(req.params.category));

    return getspecificBook.length === 0 ? res.json({ error: `No books available in ${req.params.category}` }) : res.json({ book: getspecificBook });
});

//Get book based on author

bookApp.get('/a/:id', (req, res) => {
    const getspecificBook = db.Books.filter((book) => book.authors.indexOf(Number(req.params.id)) != -1);

    return getspecificBook.length === 0 ? res.json({ error: `No books available by ${db.Authors[req.params.id - 1].name}` }) : res.json({ book: getspecificBook });
});

//Get book by language
bookApp.get('/lang/:language', (req, res) => {
    const getspecificBook = db.Books.filter((book) => book.language === req.params.language);

    return getspecificBook.length === 0 ? res.json({ error: `No books available in ${req.params.language}` }) : res.json({ book: getspecificBook });
});


//Get all authors
bookApp.get('/author', (req, res) => {
    return res.json({ author: db.Authors });
});

//Get specific author
bookApp.get('/author/:id', (req, res) => {
    const getspecificAuthor = db.Authors.filter((author) => author.id === Number(req.params.id));

    return getspecificAuthor.length === 0 ? res.json({ error: `Author does not exist` }) : res.json({ author: getspecificAuthor });
});

//Get list of authors based on book
bookApp.get('/author/book/:ISBN', (req, res) => {
    const getspecificAuthor = db.Authors.filter(author => author.books.includes(req.params.ISBN));

    return getspecificAuthor === 0 ? res.json({ error: `No author found for book with ISBN ${req.params.ISBN}` }) : res.json({ author: getspecificAuthor });
});

//Get all publications
bookApp.get('/publication', (req, res) => {
    return res.json({ publication: db.Publications });
});

//Get specific publication
bookApp.get('/publication/:id', (req, res) => {
    const getspecificPublication = db.Publications.filter((publication) => publication.id === Number(req.params.id));

    return getspecificPublication.length === 0 ? res.json({ error: `Publication does not exist` }) : res.json({ publication: getspecificPublication });
});

//Get list of publications based on book
bookApp.get('/publication/book/:ISBN', (res, req) => {
    const getspecificPublication = db.Publications.filter(publication => publication.books.includes(req.params.ISBN));

    return getspecificPublication === 0 ? res.json({ error: `No publications found for book with ISBN ${req.params.ISBN}` }) : res.json({ publication: getspecificPublication });

});

/* POST */

//Route /books/create
//Description Add new book
//Access PUBLIC
//Parameter NONE
//Method POST

bookApp.post('/book/create', (req, res) => {
    const newBook = req.body;
    db.Books.push(newBook);

    return res.json({ updatedBooks: db.Books });
});

//Add new author

bookApp.post('/author/create', (req, res) => {
    const newAuthor = req.body;
    db.Authors.push(newAuthor);

    return res.json({ updatedAuthors: db.Authors });
});

//Add new publication
bookApp.post('/publication/create', (req, res) => {
    const newPublication = req.body;
    db.Publications.push(newPublication);

    return res.json({ updatedPublication: db.Publications });
});

/* PUT */

//Route /publication/update/book
//Description Update or change publication of book
//Access PUBLIC
//Parameter ISBN
//Method PUT

bookApp.put('/publication/update/book/:ISBN', (req, res) => {
    const getspecificBook = db.Books.filter((book) => book.ISBN === req.params.ISBN);
    //Loop through publications and delete book from database by ISBN in parameter
    if (getspecificBook.length > 0) {
        db.Publications.forEach((pub) => {
            if(pub.books.includes(req.params.ISBN)){
               return pub.books.splice(pub.books.indexOf(req.params.ISBN), 1);
            }
        });
    //Find publication with id given in request body in database and add book to update publication
        db.Publications.forEach((pub) => {
            if (pub.id === req.body.pubId) {
                return pub.books.push(req.params.ISBN);
            }
        });
    //Find book with ISBN given in parameter in database and update publication reference key
        db.Books.forEach((book) => {
            if (book.ISBN === req.params.ISBN) {
                book.publications = [req.body.pubId];
                return;
            }
        });

    //return updated book and publication object
        return res.json({
            book: db.Books,
            publication: db.Publications,
            message: "Succesfully update publication"
        });
    }else{
        return res.json({error: `No Book exists with ISBN ${req.params.ISBN}`});
    }
});

/* DELETE */

//Route /publication/update/book
//Description Update or change publication of book
//Access PUBLIC
//Parameter ISBN
//Method PUT

bookApp.delete('/book/delete/:ISBN', (req,res) => {
    const updatedBooks = db.Books.filter((book) => book.ISBN !== req.params.ISBN);
    db.Books.splice(0); 
    db.Books.push(updatedBooks);
    return res.json({book: updatedBooks});
});

//Delete author from book
bookApp.delete('/book/delete/author/:ISBN', (req, res) => {
    db.Books.forEach((book) => {
        if(book.ISBN === req.params.ISBN){
            const getUpdatedAuthor = book.authors.filter((author) => author !== parseInt(req.body.authorId));
            book.authors = getUpdatedAuthor;
            return;
        }
    });

    return res.json({book : db.Books});
});

//Delete author from book and book key from author
bookApp.delete('/book/delete/author/:ISBN/:id', (req, res) => {
    db.Books.forEach((book) => {
        if(book.ISBN === req.params.ISBN){
            const getUpdatedAuthor = book.authors.filter((eachAuthor) => eachAuthor !== parseInt(req.params.id));
            book.authors = getUpdatedAuthor;
            return;
        }
    });

    db.Authors.forEach((author) => {
        if(author.id === parseInt(req.params.id)){
            const getUpdatedBooks = author.books.filter((eachBook) => eachBook !== req.params.ISBN);
            author.books = getUpdatedBooks;
            return;
        }
    });

    return res.json({book : db.Books, author: db.Authors, message: "Sucessfully updated"});
});

//Listen to port 3000
bookApp.listen(3000, () => {
    console.log('server is running')
});