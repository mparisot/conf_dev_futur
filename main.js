'use strict';

import {getBooks} from './components/booksFetcher.js';

getBooks().then((books) => {
    let booksTags = '';
    for (let book of books) {
        booksTags += `<div style="font-weight:bold;">${book.title}</div>`;
    }

    document.getElementById('main').innerHTML = booksTags;
});