'use strict'

function init() {
    renderTable()
    onSetLang(getCurrLang())
}


function renderTable() {
    var books = getBooks()

    // console.log('books: ', books)
    var rowCounter = 1
    const strHTMLs = books.map(
        (book) => `
        <tr>
        <td>${rowCounter++}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td><button class="btn btn-success" data-trans="read" onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button class="btn btn-warning" data-trans="update" onclick="onUpdateBookPrice('${book.id}')">Update</button></td>
        <td><button class="btn btn-danger" data-trans="delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`
    )

    document.querySelector('tbody').innerHTML = strHTMLs.join('')
}

function onSetLang(val) {
    setLang(val)
    if (val === "he") document.body.classList.add("rtl")
    else document.body.classList.remove("rtl")
    doTrans()
}

function onReadBook(bookId) {
    console.log('bookId: ', bookId)
    var book = getBookById(bookId)
    var elModal = document.querySelector('.my-modal')
    elModal.style.display = 'block'
    elModal.querySelector('h4').innerText = book.title
    elModal.querySelector('p').innerText = book.description
    elModal.querySelector('.rating').innerText = book.rate
}

function closeModal() {
    var elModal = document.querySelector('.my-modal')
    elModal.style.display = 'none'
    elModal.classList.remove('open')

}

function plusBtn() {
    var elModal = document.querySelector('.my-modal')
    var bookName = elModal.querySelector('h4').innerText
    var book = getBookByTitle(bookName)
    var currBook = plusRate(book)

    elModal.querySelector('.rating').innerText = currBook.rate

}

function minusBtn() {
    var elModal = document.querySelector('.my-modal')
    var bookName = elModal.querySelector('h4').innerText
    var book = getBookByTitle(bookName)
    var currBook = minusRate(book)

    elModal.querySelector('.rating').innerText = currBook.rate

}

function onUpdateBookPrice(bookId) {
    var bookPrice = prompt('Please enter the new price')
    updateBook(bookId, bookPrice)
    renderTable()
}


function onRemoveBook(bookId) {
    console.log('bookId: ', bookId)
    removeBook(bookId)
    renderTable()
    onSetLang(getCurrLang())
}

function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
    renderTable()

    const queryStringParams = `?filter=${filterBy}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onNewBook(ev) {
    ev.preventDefault()
    const elName = document.querySelector('[name=bookname]')
    const bookName = elName.value
    const elPrice = document.querySelector('[name=price]')
    const bookPrice = elPrice.value
    addBook(bookName, bookPrice)
    renderTable()

    elName.value = ''
    elPrice.value = ''
}

function onNextPage() {
    nextPage()
    renderTable()
    onSetLang(getCurrLang())
}

function onPrevPage() {
    prevPage()
    renderTable()
    onSetLang(getCurrLang())
}