'use strict';

export function getBooks() {
    return fetch('./mock.json').then(response => response.json())
        .then(data => _extractBooksFromJSON(data));
}

function _extractBooksFromJSON(json) {
    let books = [];
    for (let module of json.modules) {
        if (module[0] === "list") {
            books.push(...module[1].books);
        }
    }
    return books;
}