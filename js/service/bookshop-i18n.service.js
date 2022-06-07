'use strict'
var gTrans = {
    header: {
        en: 'My Book Shop',
        es: 'Mi librería',
        he: 'חנות הספרים שלי'
    },
    filter: {
        en: 'Filter',
        es: 'Filtrar',
        he: 'מסנן'
    },
    'select-filter': {
        en: 'Select Filter',
        es: 'Seleccionar filtro',
        he: 'בחר מסנן'
    },
    'select-filter-rate': {
        en: 'By Rate',
        es: 'Por tarifa',
        he: 'לפי דירוג'
    },
    'select-filter-price': {
        en: 'By price',
        es: 'Por precio',
        he: 'לפי מחיר'
    },
    'add-book-placeholder-name': {
        en: 'Enter Book Name',
        es: 'Ingrese el nombre del libro',
        he: 'שם הספר'
    },
    'add-book-placeholder-price': {
        en: 'Enter Book Price',
        es: 'Ingrese el precio del libro',
        he: 'מחיר הספר'
    },
    'create-book': {
        en: 'Create new book 📖',
        es: 'Crear nuevo libro 📖',
        he: 'צור ספר חדש 📖'
    },
    read: {
        en: 'Read',
        es: 'leer',
        he: 'קרא'
    },
    update: {
        en: 'Update',
        es: 'Actualizar',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        es: 'Eliminar',
        he: 'מחק'
    },
    id: {
        en: 'Id',
        es: 'identificación',
        he: 'מספר סידורי'
    },
    title: {
        en: 'Title',
        es: 'título',
        he: 'כותרת'
    },
    price: {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר'
    },
    action: {
        en: 'Actions',
        es: 'comportamiento',
        he: 'פעולות'
    },
    prev: {
        en: '⬅️',
        es: '⬅️',
        he: '➡️'
    },
    next: {
        en: '➡️',
        es: '➡️',
        he: '⬅️'
    },
    'book-description': {
        en: 'Book description',
        es: 'Descripción del libro',
        he: 'תיאור הספר'
    },
}

var gCurrLang = 'en'

function getCurrLang() {
    return gCurrLang
}

function setLang(lang) {
    gCurrLang = lang; // he
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return "UNKNOWN";

    var txt = keyTrans[gCurrLang] // he
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)

        if (el.localName === "input") {
            el.setAttribute("placeholder", txt)
                // el.placeholder = txt
        } else el.innerText = txt
    })
}