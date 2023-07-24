Book management API

Book props:
ISBN, title, date published, language, publication, categories[], authors[]

Author props:
id, name, books[]

Publication props:
id, name, books[]

Functionality of API by object:

<!-- GET -->
Books:
-Get all books
-Get specific book
-Get list of books based on category, author, publication, language, title 

Authors:
-Get all authors
-Get specific authors
-Get list of authors based on book

Publication:
-Get all publications
-Get specific publication
-Get list of publication based on book

<!-- POST -->
-Create new book, author, publication

<!-- PUT -->
-Update book if author changes
-Update book if publication changes

<!-- DELETE -->
-Delete a book
-Delete author from book
-Delete author from book and delete book key from author