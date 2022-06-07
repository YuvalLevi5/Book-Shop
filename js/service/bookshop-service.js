'use strict'
var gId = 1
var gBooks
var gSort = ''
var gPageIdx = 0
const PAGE_SIZE = 4

_createBooks()

function getBooks() {
    var books = gBooks
    if (gSort) {
        if (gSort === 'rate') {
            books = gBooks.sort(function(book1, book2) {
                return (book1.rate - book2.rate)
            })
        } else if (gSort === 'price') {
            books = gBooks.sort(function(book1, book2) {
                return (book1.price - book2.price)
            })

        } else if (gSort === 'cheap') {
            books = gBooks.filter(book => book.price < 50)
            console.log('books: ', books)
        } else if (gSort === 'expen') {
            books = gBooks.filter(book => book.price > 50)
            console.log('books: ', books)

        }
    }

    const startIdx = gPageIdx * PAGE_SIZE
    console.log('startIdx: ', startIdx)
    books = books.slice(startIdx, startIdx + PAGE_SIZE)

    return books

}

function setFilterBy(filter) {
    gSort = filter
}

function getCurrPage() {
    return gPageIdx
}

function nextPage() {

    if ((gPageIdx * PAGE_SIZE + PAGE_SIZE) >= gBooks.length) {
        return false
    }
    gPageIdx++
    return true
}

function prevPage() {
    if (gPageIdx <= 0) {
        return
    }
    gPageIdx--
}

function updateBook(bookId, price) {
    var book = gBooks.find(book => book.id === bookId)
    book.price = price
    _saveBooks()
}

function addBook(title, price) {
    var newBook = _createBook(title, price)
    console.log('newBook: ', newBook)
    gBooks.unshift(newBook)
    _saveBooks()

}



function removeBook(bookId) {
    var removedBook = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(removedBook, 1)
    _saveBooks()

}

function getBookById(bookId) {
    var book = gBooks.find((book) => book.id === bookId)
    return book
}



function getBookByTitle(title) {
    var currBook = gBooks.find(book => book.title === title)
    return currBook

}

function plusRate(book) {
    book.rate++
        console.log('book: ', book)
    console.log('gBooks: ', gBooks)
    _saveBooks()
    return book
}

function minusRate(book) {
    if (book.rate === 0) return
    console.log('book: ', book)
    book.rate--
        _saveBooks()

    return book
}




function _createBooks() {
    if (loadFromStorage('booksDB')) {
        gBooks = loadFromStorage('booksDB')
    } else {
        gBooks = [
            _createBook('Learning Laravel', '10'),
            _createBook('Beginning with Laravel', '15.5'),
            _createBook('Java for developers', '7'),
        ]
    }
}

function _createBook(title, price = 5) {
    return {
        id: makeId(),
        title,
        price: price,
        description: makeLorem(),
        rate: 0
    }

}

function _saveBooks() {
    saveToStorage('booksDB', gBooks)
}

function makeLorem(wordCount = 30) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getAllBooks() {
    return gBooks
}